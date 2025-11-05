import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Sparkles, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

export default function CTASection() {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Load ClickUp forms script
    const script = document.createElement("script");
    script.src = "https://app-cdn.clickup.com/assets/js/forms-embed/v1.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleStartRegistration = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowForm(true);
    // Smooth scroll to form after a brief delay
    setTimeout(() => {
      document.getElementById("register")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100);
  };

  const benefits = [
    "Quick Setup Process",
    "Expert Guidance",
    "Compliance Guaranteed"
  ];

  return (
    <section className="py-28 lg:py-36 bg-brand-purple-700 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-pink-400 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-brand-purple-500 rounded-full blur-3xl"
        />
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-8 lg:px-12 relative z-10">
        <motion.div {...fadeIn} className="max-w-[780px] mx-auto text-center">
         
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
          >
            Ready to Build Your Business the{" "}
            <span>
              Smart Way?
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-xl text-brand-purple-100 mb-8 leading-relaxed"
          >
            Get your company up and running in days, not weeks. Professional, hassle-free business registration.
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex flex-wrap items-center justify-center gap-6 mb-10"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="flex items-center gap-2 text-white"
              >
                <CheckCircle2 className="w-5 h-5 text-pink-300" />
                <span className="text-sm font-medium">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <motion.button
              onClick={handleStartRegistration}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="group inline-flex items-center justify-center gap-3 bg-white text-brand-purple-700 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-pink-50 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50"
            >
              Start Registration
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
            </motion.button>
          </motion.div>

          {/* Trust indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mt-8 flex items-center justify-center gap-2"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-linear-to-br from-pink-400 to-brand-purple-500 border-2 border-white"
                />
              ))}
            </div>
            <p className="text-brand-purple-100 text-sm font-medium">
              Join 100+ businesses already growing with Pink & Brand-purple
            </p>
          </motion.div>
        </motion.div>

        {/* ClickUp Form Embed with Slide Animation */}
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
                  className="absolute top-6 right-6 z-10 bg-gradient-to-r from-pink-500 to-brand-purple-700 text-white p-2.5 rounded-full hover:from-pink-600 hover:to-brand-purple-700 transition-all duration-200 shadow-lg"
                  aria-label="Close form"
                >
                  <X className="w-5 h-5" strokeWidth={2.5} />
                </motion.button>

                {/* Form Header */}
                <div className="bg-gradient-to-r from-brand-purple-700 to-pink-600 px-8 py-6">
                  <h3 className="text-2xl font-bold text-white">Business Registration Form</h3>
                  <p className="text-brand-purple-100 text-sm mt-1">Fill in your details to get started</p>
                </div>

                {/* ClickUp Form */}
                <div className="p-8">
                  <iframe
                    className="clickup-embed clickup-dynamic-height"
                    src="https://forms.clickup.com/90121132910/p/f/2kxu6pve-32/HR3WRX2KA1OLDXEGOH/business-registration-form"
                    width="100%"
                    height="100%"
                    style={{ background: "transparent", border: "none", minHeight: "500px" }}
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}