import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  CreditCard,
  Clock,
  ArrowRight,
  Mail,
  User,
  Building,
  MapPin,
  Calendar,
  Loader2,
} from "lucide-react";

const PUBLIC_PAYMENT_KEY = "pk_live_7f35457821ca77d85c3151a34f4feb430ef5ab53";

const REMINDER_OPTIONS = [
  { value: "tomorrow", label: "Tomorrow" },
  { value: "3days", label: "In 3 Days" },
  { value: "1week", label: "Next Week" },
];

type View = "initial" | "remind-form" | "payment-success" | "reminder-success";

export default function NextSteps() {
  const [currentView, setCurrentView] = useState<View>("initial");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    businessName: "",
    address: "",
    reminderTime: "tomorrow",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handlePayNow = () => {
    // Check if Paystack is loaded
    if (!window.PaystackPop) {
      console.error("Paystack script not loaded");
      alert("Payment system is loading. Please try again in a moment.");
      return;
    }

    // Initialize Paystack payment
    const handler = window.PaystackPop.setup({
      key: PUBLIC_PAYMENT_KEY,
      email: "customer@email.com", // You can collect this earlier or use a default
      amount: 100000, // Amount in kobo (1000 ZAR = 100000 kobo)
      currency: "ZAR",
      ref: "PSK_" + Math.floor(Math.random() * 1000000000 + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "Service",
            variable_name: "service",
            value: "Company Registration",
          },
        ],
      },
      callback: function (response: any) {
        console.log("Payment successful:", response);
        setCurrentView("payment-success");
      },
      onClose: function () {
        console.log("Payment window closed");
      },
    });

    handler.openIframe();
  };

  const handleRemindLater = () => {
    setCurrentView("remind-form");
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitReminder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Call Netlify serverless function
      const response = await fetch("/.netlify/functions/add-mailerlite-subscriber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add subscriber");
      }

      const data = await response.json();
      console.log("Subscriber added:", data);

      setCurrentView("reminder-success");
    } catch (error) {
      console.error("Error submitting reminder:", error);
      alert("There was an error setting up your reminder. Please try again.");
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
      address: "",
      reminderTime: "tomorrow",
    });
    setFormErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Stepper */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-700 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                <CheckCircle className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold text-gray-700">Upload Info</span>
            </div>

            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-300 to-pink-300"></div>

            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  currentView !== "initial"
                    ? "bg-gradient-to-r from-purple-700 to-pink-600"
                    : "bg-gray-300"
                }`}
              >
                2
              </div>
              <span className="text-sm font-semibold text-gray-700">Choose Next Step</span>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {currentView === "initial" && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
            >
              {/* Thank You Message */}
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-block mb-6"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                    <CheckCircle
                      className="w-10 h-10 text-purple-600"
                      strokeWidth={2.5}
                    />
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                >
                  Thank You!
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 text-lg"
                >
                  Your company information has been successfully submitted.
                  <br />
                  What would you like to do next?
                </motion.p>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                {/* Pay Now Button */}
                <motion.button
                  onClick={handlePayNow}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group bg-gradient-to-r from-purple-700 to-pink-600 text-white p-6 rounded-2xl hover:from-purple-800 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl group-hover:bg-white/30 transition-all duration-300">
                      <CreditCard className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-bold text-lg mb-1">Pay Now</div>
                      <div className="text-sm text-purple-100">
                        Complete your registration with secure payment
                      </div>
                    </div>
                    <ArrowRight
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                      strokeWidth={2.5}
                    />
                  </div>
                </motion.button>

                {/* Remind Me Later Button */}
                <motion.button
                  onClick={handleRemindLater}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group bg-white border-2 border-purple-200 text-purple-700 p-6 rounded-2xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-200 transition-all duration-300">
                      <Clock className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-bold text-lg mb-1">Remind Me Later</div>
                      <div className="text-sm text-purple-600">
                        We'll send you a reminder at your preferred time
                      </div>
                    </div>
                    <ArrowRight
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                      strokeWidth={2.5}
                    />
                  </div>
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {currentView === "remind-form" && (
            <motion.div
              key="remind-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
            >
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Set Up Your Reminder
                </h2>
                <p className="text-gray-600">
                  We'll send you a friendly reminder to complete your payment
                </p>
              </div>

              <form onSubmit={handleSubmitReminder} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400" strokeWidth={2} />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (formErrors.email) {
                          setFormErrors({ ...formErrors, email: "" });
                        }
                      }}
                      placeholder="your.email@example.com"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                        formErrors.email
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 focus:border-purple-300"
                      }`}
                    />
                  </div>
                  {formErrors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                      <span>⚠️</span> {formErrors.email}
                    </motion.p>
                  )}
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" strokeWidth={2} />
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Business Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Building className="w-5 h-5 text-gray-400" strokeWidth={2} />
                    </div>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({ ...formData, businessName: e.target.value })
                      }
                      placeholder="Your Company (Pty) Ltd"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Address Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none">
                      <MapPin className="w-5 h-5 text-gray-400" strokeWidth={2} />
                    </div>
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="123 Main Street, City, Province, Postal Code"
                      rows={3}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all duration-200 resize-none"
                    />
                  </div>
                </div>

                {/* Reminder Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    When should we remind you?
                  </label>
                  <div className="space-y-2">
                    {REMINDER_OPTIONS.map((option) => (
                      <motion.label
                        key={option.value}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
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
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              reminderTime: e.target.value,
                            })
                          }
                          className="w-4 h-4 text-purple-600 focus:ring-purple-500"
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
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="space-y-3 pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className="w-full bg-gradient-to-r from-purple-700 to-pink-600 text-white py-4 rounded-xl font-bold hover:from-purple-800 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2.5} />
                        Setting up reminder...
                      </>
                    ) : (
                      <>
                        Set Reminder
                        <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={handleBackToInitial}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                  >
                    Back
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {currentView === "payment-success" && (
            <motion.div
              key="payment-success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block mb-6"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                  <CheckCircle
                    className="w-12 h-12 text-green-600"
                    strokeWidth={2.5}
                  />
                </div>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Payment Successful!
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Thank you for your payment. We'll begin processing your company
                registration immediately.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl"
              >
                <p className="text-sm text-gray-700">
                  You'll receive a confirmation email shortly with next steps and
                  your receipt.
                </p>
              </motion.div>
            </motion.div>
          )}

          {currentView === "reminder-success" && (
            <motion.div
              key="reminder-success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block mb-6"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                  <Mail className="w-12 h-12 text-purple-600" strokeWidth={2.5} />
                </div>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Reminder Set!
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                We'll send you a friendly reminder at your chosen time. Check your
                email for confirmation.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl"
              >
                <p className="text-sm text-gray-700">
                  You can complete your payment anytime by clicking the link in the
                  reminder email.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// TypeScript declarations
declare global {
  interface Window {
    PaystackPop: any;
  }
}