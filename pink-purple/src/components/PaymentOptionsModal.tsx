import { X, CreditCard, ArrowRight, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface PaymentOptionModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  onPaymentSuccess: () => void;
  onContactUs: () => void;
}

export default function PaymentOptionModal({
  showModal,
  setShowModal,
  onPaymentSuccess,
  onContactUs,
}: PaymentOptionModalProps) {
  const handlePayNow = () => {
    // Check if Paystack is loaded
    if (!window.PaystackPop) {
      console.error("Paystack script not loaded");
      alert("Payment system is loading. Please try again in a moment.");
      return;
    }

    // Initialize Paystack payment
    const handler = window.PaystackPop.setup({
      key: "pk_test_d69c968be9358e8bb02bdd8951e6b31e7470c08f",
      email: "TEST@email.com",
      amount: 100000, // Amount in kobo (1000 ZAR = 100000 kobo)
      currency: "ZAR",
      ref: "PSK_" + Math.floor(Math.random() * 1000000000 + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "Business Registration",
            variable_name: "business_registration",
            value: "Company Setup",
          },
        ],
      },
      callback: function (response: any) {
        console.log("Payment successful:", response);
        setShowModal(false);
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

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
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
                onClick={() => setShowModal(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" strokeWidth={2.5} />
              </motion.button>

              <h3 className="text-2xl font-bold text-white mb-2">
                Choose Your Path
              </h3>
              <p className="text-purple-100 text-sm">
                How would you like to proceed?
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-4">
              {/* Pay Now Option */}
              <motion.button
                onClick={handlePayNow}
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
            </div>
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