import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";

interface RegistrationFormProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  paymentSuccess: boolean;
}

export default function RegistrationForm({
  showForm,
  setShowForm,
  paymentSuccess,
}: RegistrationFormProps) {
  return (
    <AnimatePresence>
      {showForm && (
        <motion.div
          id="register"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.95 }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-20 max-w-[900px] mx-auto"
        >
          <motion.div
            initial={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)" }}
            animate={{ boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl overflow-hidden relative backdrop-blur-xl"
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setShowForm(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute top-6 right-6 z-10 bg-gradient-to-r from-pink-500 to-purple-700 text-white p-2.5 rounded-full hover:from-pink-600 hover:to-purple-800 transition-all duration-200 shadow-lg"
              aria-label="Close form"
            >
              <X className="w-5 h-5" strokeWidth={2.5} />
            </motion.button>

            {/* Form Header */}
            <div className="bg-gradient-to-r from-purple-700 to-pink-600 px-8 py-6">
              <h3 className="text-2xl font-bold text-white">
                Business Registration Form
                {paymentSuccess && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-3 inline-flex items-center gap-1 text-sm bg-green-400 text-green-900 px-3 py-1 rounded-full"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Payment Verified
                  </motion.span>
                )}
              </h3>
              <p className="text-purple-100 text-sm mt-1">
                Fill in your details to get started
              </p>
            </div>

            {/* ClickUp Form */}
            <div className="p-8">
              <iframe
                className="clickup-embed clickup-dynamic-height"
                src="https://forms.clickup.com/90121132910/p/f/2kxu6pve-32/HR3WRX2KA1OLDXEGOH/business-registration-form"
                width="100%"
                height="100%"
                style={{
                  background: "transparent",
                  border: "none",
                  minHeight: "500px",
                }}
                title="Business Registration Form"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}