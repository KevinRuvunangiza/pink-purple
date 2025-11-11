import { X, CreditCard, ArrowRight, MessageCircle, Mail, FileText } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface PaymentOptionModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  onPaymentSuccess: () => void;
  onContactUs: () => void;
}

const PUBLIC_PAYMENT_KEY: string = "pk_live_7f35457821ca77d85c3151a34f4feb430ef5ab53";

const PAYMENT_REASONS = [
  { value: "business_registration", label: "Business Registration" },
  { value: "consultation", label: "Consultation" },
  { value: "other", label: "Other" },
];

export default function PaymentOptionModal({
  showModal,
  setShowModal,
  onPaymentSuccess,
  onContactUs,
}: PaymentOptionModalProps) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [email, setEmail] = useState("");
  const [paymentReason, setPaymentReason] = useState("business_registration");
  const [emailError, setEmailError] = useState("");

  const handlePayNowClick = () => {
    setShowPaymentForm(true);
  };

  const handleBackToOptions = () => {
    setShowPaymentForm(false);
    setEmail("");
    setEmailError("");
    setPaymentReason("business_registration");
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleContinueToPayment = () => {
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    // Check if Paystack is loaded
    if (!window.PaystackPop) {
      console.error("Paystack script not loaded");
      alert("Payment system is loading. Please try again in a moment.");
      return;
    }

    const selectedReason = PAYMENT_REASONS.find(r => r.value === paymentReason);

    // Initialize Paystack payment
    const handler = window.PaystackPop.setup({
      key: PUBLIC_PAYMENT_KEY,
      email: email.trim(),
      amount: 100, // Amount in kobo (1000 ZAR = 100000 kobo)
      currency: "ZAR",
      ref: "PSK_" + Math.floor(Math.random() * 1000000000 + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "Payment Reason",
            variable_name: paymentReason,
            value: selectedReason?.label || "Business Registration",
          },
        ],
      },
      callback: function (response: any) {
        console.log("Payment successful:", response);
        setShowModal(false);
        setShowPaymentForm(false);
        setEmail("");
        setPaymentReason("business_registration");
        onPaymentSuccess();
      },
      onClose: function () {
        console.log("Payment window closed");
      },
    });

    handler.openIframe();
  };

  const handleContactClick = () => {
    setShowModal(false);
    onContactUs();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowPaymentForm(false);
    setEmail("");
    setEmailError("");
    setPaymentReason("business_registration");
  };

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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-700 to-pink-600 px-8 py-6 relative">
              <motion.button
                onClick={handleCloseModal}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" strokeWidth={2.5} />
              </motion.button>

              <h3 className="text-2xl font-bold text-white mb-2">
                {showPaymentForm ? "Payment Details" : "Choose Your Path"}
              </h3>
              <p className="text-purple-100 text-sm">
                {showPaymentForm
                  ? "Enter your information to continue"
                  : "How would you like to proceed?"}
              </p>
            </div>

            {/* Modal Content */}
            <AnimatePresence mode="wait">
              {!showPaymentForm ? (
                <motion.div
                  key="options"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 space-y-4"
                >
                  {/* Pay Now Option */}
                  <motion.button
                    onClick={handlePayNowClick}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="w-full group bg-gradient-to-r from-purple-700 to-pink-600 text-white p-6 rounded-2xl hover:from-purple-800 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl group-hover:bg-white/30 transition-all duration-300">
                        <CreditCard className="w-6 h-6" strokeWidth={2.5} />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-bold text-lg mb-1">Pay Now</div>
                        <div className="text-sm text-purple-100">
                          Secure payment via Paystack
                        </div>
                      </div>
                      <ArrowRight
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                        strokeWidth={2.5}
                      />
                    </div>
                  </motion.button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">or</span>
                    </div>
                  </div>

                  {/* Contact Us Option */}
                  <motion.button
                    onClick={handleContactClick}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="w-full group bg-white border-2 border-purple-200 text-purple-700 p-6 rounded-2xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-200 transition-all duration-300">
                        <MessageCircle className="w-6 h-6" strokeWidth={2.5} />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-bold text-lg mb-1">Contact Us</div>
                        <div className="text-sm text-purple-600">
                          We'll reach out to you
                        </div>
                      </div>
                      <ArrowRight
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                        strokeWidth={2.5}
                      />
                    </div>
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 space-y-6"
                >
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" strokeWidth={2} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError("");
                        }}
                        placeholder="your.email@example.com"
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
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

                  {/* Payment Reason */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Payment Reason
                    </label>
                    <div className="space-y-2">
                      {PAYMENT_REASONS.map((reason) => (
                        <motion.label
                          key={reason.value}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                            paymentReason === reason.value
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-200 hover:border-purple-200 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentReason"
                            value={reason.value}
                            checked={paymentReason === reason.value}
                            onChange={(e) => setPaymentReason(e.target.value)}
                            className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                          />
                          <FileText
                            className={`w-5 h-5 ${
                              paymentReason === reason.value
                                ? "text-purple-600"
                                : "text-gray-400"
                            }`}
                            strokeWidth={2}
                          />
                          <span
                            className={`font-medium ${
                              paymentReason === reason.value
                                ? "text-purple-700"
                                : "text-gray-700"
                            }`}
                          >
                            {reason.label}
                          </span>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <motion.button
                      onClick={handleContinueToPayment}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="w-full bg-gradient-to-r from-purple-700 to-pink-600 text-white py-4 rounded-xl font-bold hover:from-purple-800 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      Continue to Payment
                      <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                    </motion.button>

                    <motion.button
                      onClick={handleBackToOptions}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.2 }}
                      className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                    >
                      Back
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Add TypeScript declaration for Paystack
declare global {
  interface Window {
    PaystackPop: any;
  }
}