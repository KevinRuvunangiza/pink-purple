import { X, ArrowRight, Mail, DollarSign } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";

interface PaymentOptionModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  onPaymentSuccess: () => void;
  preselectedService?: string;
  preselectedPrice?: number;
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

const PUBLIC_PAYMENT_KEY = "pk_live_7f35457821ca77d85c3151a34f4feb430ef5ab53";

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
    price: 850,
    description: "Complete registration package for public companies",
  },
  // {
  //   value: "consultation",
  //   label: "Business Consultation",
  //   price: 500,
  //   description: "Expert consultation for your business needs",
  // },
  // {
  //   value: "other",
  //   label: "Other Services",
  //   price: 0,
  //   description: "Custom pricing - we'll contact you",
  // },
];


export default function PaymentOptionModal({
  showModal,
  setShowModal,
  onPaymentSuccess,
  preselectedService = "private_company",
  preselectedPrice = 0,
}: PaymentOptionModalProps) {
  const [email, setEmail] = useState("");
  const [selectedService, setSelectedService] = useState(preselectedService);
  const [customPrice, setCustomPrice] = useState(preselectedPrice);
  const [emailError, setEmailError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Update selected service and price when props change
  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
    if (preselectedPrice) {
      setCustomPrice(preselectedPrice);
    }
  }, [preselectedService, preselectedPrice]);

  // Get current service details - memoized for performance
  const currentService = useMemo(
    () => SERVICE_OPTIONS.find((service) => service.value === selectedService),
    [selectedService]
  );

  // Calculate final price - memoized
  const finalPrice = useMemo(() => {
    if (selectedService === "other") {
      return customPrice;
    }
    return currentService?.price || 0;
  }, [selectedService, customPrice, currentService]);

  // Email validation function
  const validateEmail = useCallback((email: string): string => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  }, []);

  // Handle payment submission
  const handleContinueToPayment = useCallback((): void => {
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
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

    const handler = window.PaystackPop.setup({
      key: PUBLIC_PAYMENT_KEY,
      email: email.trim(),
      amount: finalPrice * 100, // Convert to kobo/cents
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
        ],
      },
      callback: function (response: PaystackResponse) {
        console.log("Payment successful:", response);
        setIsProcessing(false);
        handleCloseModal();
        onPaymentSuccess();
      },
      onClose: function () {
        console.log("Payment window closed");
        setIsProcessing(false);
      },
    });

    handler.openIframe();
  }, [email, selectedService, customPrice, finalPrice, currentService, validateEmail, onPaymentSuccess]);

  // Reset form and close modal
  const handleCloseModal = useCallback((): void => {
    if (isProcessing) return; // Prevent closing during payment
    setShowModal(false);
    setEmail("");
    setEmailError("");
    setCustomPrice(0);
    setSelectedService(preselectedService);
  }, [isProcessing, setShowModal, preselectedService]);

  // Handle service selection change
  const handleServiceChange = useCallback((value: string): void => {
    setSelectedService(value);
    // Reset custom price when switching away from "other"
    if (value !== "other") {
      setCustomPrice(0);
    }
  }, []);

  // Handle email input change
  const handleEmailChange = useCallback((value: string): void => {
    setEmail(value);
    if (emailError) setEmailError("");
  }, [emailError]);

  // Handle custom price change
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
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-700 to-pink-600 px-8 py-6 relative sticky top-0 z-10">
              <motion.button
                onClick={handleCloseModal}
                disabled={isProcessing}
                whileHover={!isProcessing ? { scale: 1.1, rotate: 90 } : {}}
                whileTap={!isProcessing ? { scale: 0.9 } : {}}
                transition={{ duration: 0.2 }}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Close modal"
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
              {/* Email Input */}
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
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "email-error" : undefined}
                  />
                </div>
                <AnimatePresence>
                  {emailError && (
                    <motion.p
                      id="email-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                      role="alert"
                    >
                      <span>⚠️</span> {emailError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Service Selection */}
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
                      } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={service.value}
                        checked={selectedService === service.value}
                        onChange={(e) => handleServiceChange(e.target.value)}
                        disabled={isProcessing}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500 mt-1"
                        aria-label={service.label}
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

              {/* Custom Price Input (only for "other" service) */}
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
                      aria-label="Custom price amount"
                    />
                  </div>
                </motion.div>
              )}

              {/* Price Summary */}
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

              {/* Payment Button */}
              <div className="space-y-3 pt-2">
                <motion.button
                  onClick={handleContinueToPayment}
                  disabled={isProcessing || finalPrice <= 0}
                  whileHover={
                    !isProcessing && finalPrice > 0
                      ? { scale: 1.02, y: -2 }
                      : {}
                  }
                  whileTap={
                    !isProcessing && finalPrice > 0 ? { scale: 0.98 } : {}
                  }
                  transition={{ duration: 0.2 }}
                  className="w-full bg-gradient-to-r from-purple-700 to-pink-600 text-white py-4 rounded-xl font-bold hover:from-purple-800 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                  aria-label={`Pay R${finalPrice.toFixed(2)}`}
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

// Type declaration for Paystack
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