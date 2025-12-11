import { X, ArrowRight, Mail, DollarSign } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { ApiService } from '../services/api.service';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface PaymentOptionModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  onPaymentSuccess: () => void;
  preselectedService?: string;
  preselectedPrice?: number;
  submissionId?: string;
}

interface ServiceOption {
  value: string;
  label: string;
  price: number;
  description: string;
}

interface PaystackResponse {
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
}

const PUBLIC_PAYMENT_KEY = "pk_test_3492412833f812c4dd9984e8d550a0b332816e1d";

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    value: "private_company",
    label: "Private Company (Pty Ltd)",
    price: 650,
    description: "Complete registration package for private companies",
  },
  {
    value: "public_company",
    label: "Public Company",
    price: 950,
    description: "Complete registration package for public companies",
  },
];

export default function PaymentOptionModal({
  showModal,
  setShowModal,
  onPaymentSuccess,
  preselectedService = "private_company",
  preselectedPrice = 0,
  submissionId,
}: PaymentOptionModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedService, setSelectedService] = useState(preselectedService);
  const [customPrice, setCustomPrice] = useState(preselectedPrice);
  const [emailError, setEmailError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
    if (preselectedPrice) {
      setCustomPrice(preselectedPrice);
    }
  }, [preselectedService, preselectedPrice]);

  const currentService = useMemo(
    () => SERVICE_OPTIONS.find((service) => service.value === selectedService),
    [selectedService]
  );

  const finalPrice = useMemo(() => {
    if (selectedService === "other") {
      return customPrice;
    }
    return currentService?.price || 0;
  }, [selectedService, customPrice, currentService]);

  const validateEmail = useCallback((email: string): string => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  }, []);

  const validateName = useCallback((name: string): string => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  }, []);

  const savePaymentToDatabase = async (
    paymentResponse: PaystackResponse,
    activeSubmissionId: string
  ) => {
    try {
      const paymentData = {
        submission_id: activeSubmissionId,
        amount: finalPrice,
        status: "paid" as const,
        reference: paymentResponse.reference,
        paystack_reference: paymentResponse.reference,
        payment_method: "paystack",
        metadata: {
          service_type: currentService?.label || "Custom Service",
          service_value: selectedService,
          email: email,
          name: name,
          transaction_id: paymentResponse.transaction,
        },
        paid_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("payments")
        .insert(paymentData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      console.log("Payment saved successfully");

      const { error: updateError } = await supabase
        .from("submissions")
        .update({
          status: "paid",
          updated_at: new Date().toISOString(),
        })
        .eq("id", activeSubmissionId);

      if (updateError) {
        console.error("Could not update submission:", updateError);
      } else {
        console.log("Submission status updated to paid");
      }

      return data;
    } catch (error) {
      console.error("Failed to save payment:", error);
      return null;
    }
  };

  const handleContinueToPayment = useCallback(async (): Promise<void> => {
    const emailError = validateEmail(email);
    if (emailError) {
      setEmailError(emailError);
      return;
    }

    const nameError = validateName(name);
    if (nameError) {
      setEmailError(nameError);
      return;
    }

    if (selectedService === "other" && customPrice <= 0) {
      setEmailError("Please enter a valid amount for custom services");
      return;
    }

    if (!window.PaystackPop) {
      setEmailError("Payment system is loading. Please try again shortly.");
      return;
    }

    setIsProcessing(true);
    setEmailError("");

    try {
      let activeSubmissionId = submissionId;

      if (!activeSubmissionId) {
        const newSubmission = await ApiService.createSubmission({
          name: name,
          email: email,
          service_type: currentService?.label || "Custom Service",
          status: "pending",
          source: "landing_page",
          message: `Payment for ${currentService?.label || "service"}`,
        });

        activeSubmissionId = newSubmission.id;
      }

      const handler = window.PaystackPop.setup({
        key: PUBLIC_PAYMENT_KEY,
        email: email.trim(),
        amount: finalPrice * 100,
        currency: "ZAR",
        ref: `BRG_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
        metadata: {
          custom_fields: [
            {
              display_name: "Service Type",
              variable_name: "service_type",
              value: currentService?.label || "Custom Service",
            },
            {
              display_name: "Service Value",
              variable_name: "service_value",
              value: selectedService,
            },
            {
              display_name: "Submission ID",
              variable_name: "submission_id",
              value: activeSubmissionId,
            },
          ],
        },
        callback: function (response: PaystackResponse) {
          savePaymentToDatabase(response, activeSubmissionId).then(() => {
            // Payment processing complete
          });

          setIsProcessing(false);
          handleCloseModal();
          onPaymentSuccess();
        },
        onClose: function () {
          setIsProcessing(false);
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error("Error setting up payment:", error);
      setEmailError("Failed to initialize payment. Please try again.");
      setIsProcessing(false);
    }
  }, [
    email,
    selectedService,
    customPrice,
    finalPrice,
    currentService,
    validateEmail,
    validateName,
    onPaymentSuccess,
    submissionId,
  ]);

  const handleCloseModal = useCallback((): void => {
    if (isProcessing) return;
    setShowModal(false);
    setEmail("");
    setName("");
    setEmailError("");
    setCustomPrice(0);
    setSelectedService(preselectedService);
  }, [isProcessing, setShowModal, preselectedService]);

  const handleServiceChange = useCallback((value: string): void => {
    setSelectedService(value);
    if (value !== "other") {
      setCustomPrice(0);
    }
  }, []);

  const handleEmailChange = useCallback(
    (value: string): void => {
      setEmail(value);
      if (emailError) setEmailError("");
    },
    [emailError]
  );

  const handleNameChange = useCallback(
    (value: string): void => {
      setName(value);
      if (emailError) setEmailError("");
    },
    [emailError]
  );

  const handleCustomPriceChange = useCallback((value: string): void => {
    const numValue = parseFloat(value) || 0;
    setCustomPrice(numValue);
  }, []);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-gradient-to-r from-purple-700 to-pink-600 px-8 py-6 relative sticky top-0 z-10">
              <motion.button
                onClick={handleCloseModal}
                disabled={isProcessing}
                whileHover={!isProcessing ? { scale: 1.1, rotate: 90 } : {}}
                whileTap={!isProcessing ? { scale: 0.9 } : {}}
                transition={{ duration: 0.2 }}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-5 h-5" strokeWidth={2.5} />
              </motion.button>

              <h3 className="text-2xl font-bold text-white mb-2">
                Complete Your Payment
              </h3>
              <p className="text-purple-100 text-sm">
                Enter your details to secure your registration
              </p>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="John Doe"
                  disabled={isProcessing}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    emailError && !email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 focus:border-purple-300"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" strokeWidth={2} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="your.email@example.com"
                    disabled={isProcessing}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      emailError
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 focus:border-purple-300"
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {emailError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                      <span>⚠️</span> {emailError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Service <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {SERVICE_OPTIONS.map((service) => (
                    <motion.label
                      key={service.value}
                      whileHover={!isProcessing ? { scale: 1.01 } : {}}
                      whileTap={!isProcessing ? { scale: 0.99 } : {}}
                      transition={{ duration: 0.2 }}
                      className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedService === service.value
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-200 hover:bg-gray-50"
                      } ${
                        isProcessing ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={service.value}
                        checked={selectedService === service.value}
                        onChange={(e) => handleServiceChange(e.target.value)}
                        disabled={isProcessing}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500 mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span
                            className={`font-semibold ${
                              selectedService === service.value
                                ? "text-purple-700"
                                : "text-gray-800"
                            }`}
                          >
                            {service.label}
                          </span>
                          {service.price > 0 && (
                            <span
                              className={`text-lg font-bold ${
                                selectedService === service.value
                                  ? "text-purple-600"
                                  : "text-gray-600"
                              }`}
                            >
                              R{service.price}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-sm ${
                            selectedService === service.value
                              ? "text-purple-600"
                              : "text-gray-500"
                          }`}
                        >
                          {service.description}
                        </p>
                      </div>
                    </motion.label>
                  ))}
                </div>
              </div>

              {selectedService === "other" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label
                    htmlFor="customPrice"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Enter Amount (ZAR) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <DollarSign
                        className="w-5 h-5 text-gray-400"
                        strokeWidth={2}
                      />
                    </div>
                    <input
                      id="customPrice"
                      type="number"
                      value={customPrice || ""}
                      onChange={(e) => handleCustomPriceChange(e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      disabled={isProcessing}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all duration-200 disabled:bg-gray-100"
                    />
                  </div>
                </motion.div>
              )}

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Total Amount:
                  </span>
                  <span className="text-2xl font-bold text-purple-700">
                    R{finalPrice.toFixed(2)}
                  </span>
                </div>
                {finalPrice > 0 && (
                  <p className="text-xs text-gray-600 mt-2">
                    All fees included. Secure payment via Paystack.
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <motion.button
                  onClick={handleContinueToPayment}
                  disabled={isProcessing || finalPrice <= 0 || !name.trim() || !email.trim()}
                  whileHover={
                    !isProcessing && finalPrice > 0 && name.trim() && email.trim()
                      ? { scale: 1.02, y: -2 }
                      : {}
                  }
                  whileTap={
                    !isProcessing && finalPrice > 0 && name.trim() && email.trim()
                      ? { scale: 0.98 }
                      : {}
                  }
                  transition={{ duration: 0.2 }}
                  className="w-full bg-gradient-to-r from-purple-700 to-pink-600 text-white py-4 rounded-xl font-bold hover:from-purple-800 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay R{finalPrice.toFixed(2)}
                      <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-gray-500">
                  Secured by Paystack • Your payment information is encrypted
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        metadata: {
          custom_fields: Array<{
            display_name: string;
            variable_name: string;
            value: string;
          }>;
        };
        callback: (response: PaystackResponse) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}