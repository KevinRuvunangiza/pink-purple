import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  CreditCard,
  Clock,
  ArrowRight,
  Mail,
  User,
  Building,
  Calendar,
  Loader2,
} from "lucide-react";

import PaymentOptionModal from "../components/PaymentOptionsModal";
import { saveReminderForm } from "../utils/formSubmission";

const REMINDER_OPTIONS = [
  { value: "3days", label: "In 3 Days" },
  { value: "1week", label: "In a Week" },
  { value: "2weeks", label: "In 2 Weeks" },
  { value: "1month", label: "In a Month" },
];

type View =
  | "clickup-form"
  | "initial"
  | "remind-form"
  | "payment-success"
  | "reminder-success";

// Memoized progress indicator to prevent re-renders
const ProgressIndicator = ({ currentView }: { currentView: View }) => (
  <div className="hidden sm:flex items-center gap-3">
    <div className="text-xs text-gray-100">Progress</div>
    <div className="flex items-center gap-2">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm transition-colors duration-300 ${
          currentView !== "clickup-form"
            ? "bg-gradient-to-r from-purple-700 to-pink-600"
            : "bg-purple-600"
        }`}
      >
        {currentView !== "clickup-form" ? (
          <CheckCircle className="w-4 h-4" strokeWidth={2.5} />
        ) : (
          "1"
        )}
      </div>
      <div className="w-20 h-1 rounded-full bg-gradient-to-r from-purple-200 to-pink-200" />
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm bg-gray-200 text-gray-600 shadow-sm">
        2
      </div>
    </div>
  </div>
);

export default function NextSteps() {
  const [currentView, setCurrentView] = useState<View>("clickup-form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    businessName: "",
    reminderTime: "3days",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const continueButtonDelay = 1200;

  // Optimized message listener with passive event
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data?.type === "hsFormCallback" &&
        event.data?.eventName === "onFormSubmitted"
      ) {
        setCurrentView("initial");
      }
      if (event.data === "clickup-form-submitted") {
        setCurrentView("initial");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Optimized timer with proper cleanup
  useEffect(() => {
    if (currentView !== "clickup-form") return;

    setShowContinueButton(false);
    const timer = setTimeout(
      () => setShowContinueButton(true),
      continueButtonDelay
    );
    return () => clearTimeout(timer);
  }, [currentView]);

  const handlePayNow = () => setShowPaymentModal(true);
  const handleRemindLater = () => setCurrentView("remind-form");

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    setFormErrors(errors);
    const isValid = Object.keys(errors).length === 0;
    return isValid;
  };

  const handleSubmitReminder = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // THIS IS THE KEY CHANGE - Using saveReminderForm instead of direct fetch
      await saveReminderForm({
        email: formData.email,
        name: formData.name,
        businessName: formData.businessName,
        reminderTime: formData.reminderTime,
      });

      setCurrentView("reminder-success");
    } catch (error: any) {
      alert(
        `There was an error setting up your reminder: ${error.message || "Please try again."}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToInitial = () => {
    setCurrentView("initial");
    setFormData({
      email: "",
      name: "",
      businessName: "",
      reminderTime: "3days",
    });
    setFormErrors({});
  };

  const handleManualFormComplete = () => setCurrentView("initial");

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 pt-[100px]">
      {/* OPTIMIZED: Static background, no animation, positioned absolute instead of rendering pattern */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(168, 85, 247) 1px, transparent 0)`,
          backgroundSize: "60px 60px",
          willChange: "transform",
        }}
      />

      <div className="max-w-3xl mx-auto mt-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Business registration
            </h2>
            <p className="text-sm text-gray-100">
              Quick setup — submit the form below and continue to payment.
            </p>
          </div>
          <ProgressIndicator currentView={currentView} />
        </div>

        {/* OPTIMIZED: Reduced animation complexity */}
        <AnimatePresence mode="wait">
          {currentView === "clickup-form" && (
            <motion.div
              key="clickup-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/60"
            >
              {/* Form Header */}
              <div className="bg-gradient-to-r from-purple-700 to-pink-600 px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Business Registration Form
                    </h3>
                    <p className="text-purple-100 text-sm mt-1">
                      Fill in your details to get started
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-3">
                    <div className="text-xs text-white/90 bg-white/10 px-3 py-1 rounded-full">
                      Step 1 of 2
                    </div>
                  </div>
                </div>
              </div>

              {/* OPTIMIZED: Added loading state for iframe */}
              <div className="p-6 md:p-8">
                <div className="rounded-xl overflow-hidden border border-gray-100 shadow-inner relative">
                  {!iframeLoaded && (
                    <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-600">Loading form...</p>
                        <p className="text-xs text-gray-500 mt-2">
                          This may take a few seconds
                        </p>
                      </div>
                    </div>
                  )}
                  <iframe
                    className="clickup-embed w-full"
                    src="https://forms.clickup.com/90121132910/p/f/2kxu6pve-32/HR3WRX2KA1OLDXEGOH/business-registration-form"
                    width="100%"
                    height="640"
                    loading="lazy"
                    onLoad={() => setIframeLoaded(true)}
                    style={{
                      background: "transparent",
                      border: "none",
                      minHeight: "560px",
                      display: "block",
                    }}
                    title="Business Registration Form"
                  />
                </div>
              </div>

              {/* OPTIMIZED: Simplified animations */}
              <AnimatePresence mode="wait">
                {showContinueButton ? (
                  <motion.div
                    key="continue"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6 pt-4 border-t border-gray-100 bg-white/80"
                  >
                    <button
                      onClick={handleManualFormComplete}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-700 to-pink-600 text-white py-3 rounded-xl font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Form Submitted — Continue</span>
                      <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-3">
                      After submitting the form above, click to continue.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="waiting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6 pt-4 border-t border-gray-100 bg-white/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          Waiting for form completion
                        </div>
                        <div className="text-xs text-gray-500">
                          Button unlocks automatically after submission.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {currentView === "initial" && (
            <motion.div
              key="initial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-10"
            >
              <div className="text-center mb-8">
                <div className="inline-block mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                    <CheckCircle
                      className="w-10 h-10 text-purple-600"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Thank you!
                </h1>
                <p className="text-gray-600">
                  Your company information has been successfully submitted.
                  <br />
                  What would you like to do next?
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handlePayNow}
                  className="w-full group bg-gradient-to-r from-purple-700 to-pink-600 text-white p-4 md:p-6 rounded-2xl transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-4"
                >
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <CreditCard className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-base">Pay Now</div>
                    <div className="text-sm text-purple-100">
                      Complete registration with secure payment
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                </button>

                <button
                  onClick={handleRemindLater}
                  className="w-full group bg-white border-2 border-purple-100 text-purple-700 p-4 md:p-6 rounded-2xl hover:border-purple-200 hover:bg-purple-50 transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-4"
                >
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Clock className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-base">
                      Remind Me Later
                    </div>
                    <div className="text-sm text-purple-600">
                      We'll send a reminder at your chosen time
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>
          )}

          {currentView === "remind-form" && (
            <motion.div
              key="remind-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-10"
            >
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
                  Set up your reminder
                </h2>
                <p className="text-gray-600">
                  We'll send you a friendly reminder to complete your payment.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                      strokeWidth={2}
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (formErrors.email)
                          setFormErrors({ ...formErrors, email: "" });
                      }}
                      placeholder="your.email@example.com"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                        formErrors.email
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 focus:border-purple-300"
                      }`}
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-2">
                      ⚠️ {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                      strokeWidth={2}
                    />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                      }}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Name
                  </label>
                  <div className="relative">
                    <Building
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                      strokeWidth={2}
                    />
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          businessName: e.target.value,
                        });
                      }}
                      placeholder="Your Company (Pty) Ltd"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    When should we remind you?
                  </label>
                  <div className="space-y-2">
                    {REMINDER_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                          formData.reminderTime === option.value
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-200 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="reminderTime"
                          value={option.value}
                          checked={formData.reminderTime === option.value}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              reminderTime: e.target.value,
                            });
                          }}
                          className="w-4 h-4 text-purple-600"
                        />
                        <Calendar
                          className={`w-5 h-5 ${
                            formData.reminderTime === option.value
                              ? "text-purple-600"
                              : "text-gray-400"
                          }`}
                          strokeWidth={2}
                        />
                        <span
                          className={`font-medium ${
                            formData.reminderTime === option.value
                              ? "text-purple-700"
                              : "text-gray-700"
                          }`}
                        >
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <button
                    onClick={handleSubmitReminder}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-700 to-pink-600 text-white py-3 rounded-xl font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2
                          className="w-5 h-5 animate-spin"
                          strokeWidth={2.5}
                        />
                        Setting up reminder...
                      </>
                    ) : (
                      <>
                        Set Reminder
                        <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBackToInitial}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === "payment-success" && (
            <motion.div
              key="payment-success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-10 text-center"
            >
              <div className="inline-block mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                  <CheckCircle
                    className="w-12 h-12 text-green-600"
                    strokeWidth={2.5}
                  />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                Payment Successful!
              </h2>
              <p className="text-gray-600 text-base mb-6">
                Thank you for your payment. We'll begin processing your company
                registration immediately.
              </p>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                <p className="text-sm text-gray-700">
                  You'll receive a confirmation email shortly with next steps
                  and your receipt.
                </p>
              </div>
            </motion.div>
          )}

          {currentView === "reminder-success" && (
            <motion.div
              key="reminder-success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-10 text-center"
            >
              <div className="inline-block mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                  <Mail
                    className="w-12 h-12 text-purple-600"
                    strokeWidth={2.5}
                  />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                Reminder Set!
              </h2>
              <p className="text-gray-600 text-base mb-6">
                We'll send you a friendly reminder at your chosen time. Check
                your email for confirmation.
              </p>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                <p className="text-sm text-gray-700">
                  You can complete your payment anytime by clicking the link in
                  the reminder email.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showPaymentModal && (
        <PaymentOptionModal
          showModal={showPaymentModal}
          setShowModal={setShowPaymentModal}
          onPaymentSuccess={() => setCurrentView("payment-success")}
          submissionId={submissionId || undefined}
        />
      )}
    </div>
  );
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}