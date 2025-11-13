import { m } from "framer-motion"; // Changed from 'motion' to 'm'
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import PaymentOptionModal from "../PaymentOptionsModal";
import RegistrationForm from "../RegistrationForm";
import { Link } from "react-router";

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

  const handleStartRegistration = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    setShowForm(true);
    
    setTimeout(() => {
      document.getElementById("register")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100);
  };

  const handleContactUs = () => {
    setShowForm(true);
    
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
    <section className="py-28 lg:py-36 bg-brand-purple-600 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <m.div
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
        <m.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-brand-purple-600 rounded-full blur-3xl"
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
        <m.div {...fadeIn} className="max-w-[780px] mx-auto text-center">
          {/* Heading */}
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
          >
            Ready to Build Your Business the{" "}
            <span>Smart Way?</span>
          </m.h2>

          {/* Subtext */}
          <m.p
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
          </m.p>

          {/* Benefits */}
          <m.div
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
              <m.div
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
              </m.div>
            ))}
          </m.div>

          {/* CTA Button */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <Link to="next-steps" >
              <m.button
              // onClick={handleStartRegistration}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="group inline-flex items-center justify-center gap-3 bg-white text-brand-purple-600 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-pink-50 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50"
            >
              Start Registration
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
            </m.button>
            </Link>
            
          </m.div>

          {/* Trust indicator */}
          <m.div
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
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-brand-purple-500 border-2 border-white"
                />
              ))}
            </div>
            <p className="text-brand-purple-100 text-sm font-medium">
              Join 100+ businesses already growing with us
            </p>
          </m.div>
        </m.div>

        {/* Payment Options Modal */}
        <PaymentOptionModal
          showModal={showModal}
          setShowModal={setShowModal}
          onPaymentSuccess={handlePaymentSuccess}
          onContactUs={handleContactUs}
        />

        {/* Registration Form */}
        <RegistrationForm
          showForm={showForm}
          setShowForm={setShowForm}
          paymentSuccess={paymentSuccess}
        />
      </div>
    </section>
  );
}