import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
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
    const script = document.createElement('script');
    script.src = 'https://app-cdn.clickup.com/assets/js/forms-embed/v1.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleStartRegistration = (e) => {
    e.preventDefault();
    setShowForm(true);
    // Smooth scroll to form after a brief delay
    setTimeout(() => {
      document.getElementById('register')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }, 100);
  };

  return (
    <section className="py-28 lg:py-36 bg-purple-600 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
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

      <div className="max-w-[1200px] mx-auto px-8 lg:px-12 relative">
        <motion.div {...fadeIn} className="max-w-[780px] mx-auto text-center">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight tracking-tight"
          >
            Ready to Build Your Business the Smart Way?
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
            className="text-lg text-purple-100 mb-10 leading-relaxed"
          >
            Get your company up and running in days, not weeks.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <motion.button
              onClick={handleStartRegistration}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-flex items-center justify-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-50 transition-colors duration-200 shadow-lg"
            >
              Start Registration
              <ArrowRight className="w-5 h-5" strokeWidth={2} />
            </motion.button>
          </motion.div>

          {/* Optional: Trust indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-purple-200 text-sm mt-6"
          >
            Join 100+ businesses already growing with Pink & Purple
          </motion.p>
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
                animate={{ boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl overflow-hidden p-1 relative"
              >
                {/* Close Button */}
                <motion.button
                  onClick={() => setShowForm(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-4 right-4 z-10 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors duration-200 shadow-lg"
                  aria-label="Close form"
                >
                  <X className="w-5 h-5" strokeWidth={2} />
                </motion.button>

                <iframe
                  className="clickup-embed clickup-dynamic-height"
                  src="https://forms.clickup.com/90121319341/f/2kxuccxd-652/6JIS6JYHUDG1IGAXB7"
                  width="100%"
                  height="100%"
                  style={{ background: 'white', border: 'none', minHeight: '600px', borderRadius: '12px' }}
                  title="ClickUp Registration Form"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}