import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Sparkles, CheckCircle2, CreditCard, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

export default function CTASection() {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    // Load ClickUp forms script
    const script = document.createElement("script");
    script.src = "https://app-cdn.clickup.com/assets/js/forms-embed/v1.js";
    script.async = true;
    document.body.appendChild(script);

    // Load Paystack script
    const paystackScript = document.createElement("script");
    paystackScript.src = "https://js.paystack.co/v1/inline.js";
    paystackScript.async = true;
    document.body.appendChild(paystackScript);

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.body.contains(paystackScript)) {
        document.body.removeChild(paystackScript);
      }
    };
  }, []);

  const handleStartRegistration = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handlePayNow = () => {
    // Initialize Paystack payment
    const handler = window.PaystackPop.setup({
      key: 'pk_test_3492412833f812c4dd9984e8d550a0b332816e1d',
      email: 'customer@email.com', // You can collect this in a pre-form
      amount: 100000, // Amount in kobo (1000 ZAR = 100000 kobo)
      currency: 'ZAR',
      ref: 'PSK_' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "Business Registration",
            variable_name: "business_registration",
            value: "Company Setup"
          }
        ]
      },
      callback: function(response) {
        // Payment successful
        console.log('Payment successful:', response);
        setPaymentSuccess(true);
        setShowModal(false);
        setShowForm(true);
        
        // Smooth scroll to form after a brief delay
        setTimeout(() => {
          document.getElementById("register")?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }, 100);
      },
      onClose: function() {
        console.log('Payment window closed');
      }
    });
    
    handler.openIframe();
  };

  const handleContactUs = () => {
    // Skip payment and show form directly
    setShowModal(false);
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
    <section className="py-28 lg:py-36 bg-purple-700 relative overflow-hidden">
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
          className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-purple-500 rounded-full blur-3xl"
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
            className="text-xl text-purple-100 mb-8 leading-relaxed"
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
              className="group inline-flex items-center justify-center gap-3 bg-white text-purple-700 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-pink-50 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50"
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
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-white"
                />
              ))}
            </div>
            <p className="text-purple-100 text-sm font-medium">
              Join 100+ businesses already growing with us
            </p>
          </motion.div>
        </motion.div>

        {/* Payment Options Modal */}
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
                  
                  <h3 className="text-2xl font-bold text-white mb-2">Choose Your Path</h3>
                  <p className="text-purple-100 text-sm">How would you like to proceed?</p>
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
                        <div className="text-sm text-purple-100">Secure payment via Paystack</div>
                      </div>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
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
                    onClick={handleContactUs}
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
                        <div className="text-sm text-purple-600">We'll reach out to you</div>
                      </div>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                  <p className="text-purple-100 text-sm mt-1">Fill in your details to get started</p>
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