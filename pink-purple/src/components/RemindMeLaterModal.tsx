import { useState } from "react";
import { X, Mail, User, Building, Calendar, ArrowRight } from "lucide-react";

const REMINDER_OPTIONS = [
  { value: "3days", label: "In 3 Days" },
  { value: "1week", label: "In a Week" },
  { value: "2weeks", label: "In 2 Weeks" },
  { value: "1month", label: "In a Month" },
];

interface RemindMeLaterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RemindMeLaterModal({
  isOpen,
  onClose,
}: RemindMeLaterModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    businessName: "",
    reminderTime: "3days",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "/.netlify/functions/add-mailerlite-subscriber",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add subscriber");
      }

      setIsSuccess(true);
      
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            email: "",
            name: "",
            businessName: "",
            reminderTime: "3days",
          });
        }, 300);
      }, 3000);
    } catch (error) {
      console.error("Error submitting reminder:", error);
      alert("There was an error setting up your reminder. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in pointer-events-auto">
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 rounded-t-3xl relative">
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" strokeWidth={2.5} />
                </button>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Set up your reminder
                </h2>
                <p className="text-purple-100">
                  We'll send you a friendly reminder to complete your registration
                </p>
              </div>

              {/* Form */}
              <div className="p-8 space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail
                        className="w-5 h-5 text-gray-400"
                        strokeWidth={2}
                      />
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
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1 animate-slide-in">
                      <span>⚠️</span> {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User
                        className="w-5 h-5 text-gray-400"
                        strokeWidth={2}
                      />
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
                      <Building
                        className="w-5 h-5 text-gray-400"
                        strokeWidth={2}
                      />
                    </div>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessName: e.target.value,
                        })
                      }
                      placeholder="Your Company (Pty) Ltd"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all duration-200"
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
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.01] ${
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
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Setting up reminder...
                    </>
                  ) : (
                    <>
                      Set Reminder
                      <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            // Success State
            <div className="p-12 text-center">
              <div className="inline-block mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center animate-scale-in">
                  <Mail
                    className="w-12 h-12 text-green-600"
                    strokeWidth={2.5}
                  />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Reminder Set!
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                We'll send you a friendly reminder at your chosen time.
              </p>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                <p className="text-sm text-gray-700">
                  Check your email for confirmation. You can complete your
                  registration anytime!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}