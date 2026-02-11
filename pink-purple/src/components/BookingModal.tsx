import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, CheckCircle } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: "starter" | "foundations" | "accelerate" | null;
}

const PACKAGE_CONTENT = {
  starter: {
    title: "Launch Starter",
    subtitle: "Essential Legal & Identity Setup",
    description: "Get your business registered and professionally branded.",
    features: [
      "CIPC Business Registration",
      "Basic Brand Identity",
      "Professional Email Setup",
    ],
  },
  foundations: {
    title: "Digital Foundations",
    subtitle: "Website & Digital Presence",
    description: "Launch with a professional website and complete digital identity.",
    features: [
      "Everything in Starter",
      "Professional Website Development",
      "Domain Registration (1 year)",
      "Social Media Profile Setup",
    ],
  },
  accelerate: {
    title: "Launch Accelerate",
    subtitle: "Full Compliance, Automation & Marketing",
    description: "Complete business launch with automation and marketing foundation.",
    features: [
      "Everything in Digital Foundations",
      "CRM Automation Setup",
      "Email Marketing Campaign",
      "30-Day Content Calendar",
      "5 Marketing Templates",
      "FREE 1-Hour Strategy Session",
    ],
  },
};

export default function BookingModal({
  isOpen,
  onClose,
  selectedPackage = null,
}: BookingModalProps) {
  const content =
    selectedPackage && PACKAGE_CONTENT[selectedPackage]
      ? PACKAGE_CONTENT[selectedPackage]
      : {
          title: "Book Your Strategy Call",
          subtitle: "Launch Accelerate",
          description: "Let's ensure we're a perfect fit for your business goals.",
          features: [],
        };
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            key="modal-content"
            className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-3xl font-bold leading-none transition-colors cursor-pointer"
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              type="button"
            >
              ×
            </motion.button>

            <motion.div
              className="text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4"
                variants={scaleIn}
              >
                <Calendar className="w-8 h-8" />
              </motion.div>
              <motion.h3
                className="text-2xl font-bold text-slate-900 mb-1"
                variants={fadeInUp}
              >
                {content.title}
              </motion.h3>
              {content.subtitle && (
                <motion.p
                  className="text-pink-600 font-semibold text-sm mb-3"
                  variants={itemVariants}
                >
                  {content.subtitle}
                </motion.p>
              )}
              <motion.p
                className="text-slate-600 text-sm mb-4"
                variants={itemVariants}
              >
                {content.description}
              </motion.p>
              {content.features.length > 0 && (
                <motion.ul
                  className="text-left text-sm text-slate-700 mb-6 space-y-2"
                  variants={containerVariants}
                >
                  {content.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-2"
                      variants={itemVariants}
                    >
                      <CheckCircle className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}

              <motion.div className="space-y-3" variants={containerVariants}>
                <motion.a
                  href="https://calendly.com/ruvunangizakev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Select Time on Calendly
                </motion.a>
                <motion.a
                  href="mailto:info@pinkandpurple.co.za"
                  className="block w-full bg-white border-2 border-slate-300 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Request A CallBack
                </motion.a>
              </motion.div>
              <motion.p
                className="text-xs text-slate-400 mt-4"
                variants={itemVariants}
              >
                No obligation. 100% Free.
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
