import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
};

export default function HeroSection() {
  return (
    <section id="home" className="relative bg-neutral-900 pt-32 pb-28 lg:pt-40 lg:pb-36 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Radial glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px] opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600 rounded-full blur-[140px] opacity-15" />

      <div className="max-w-[1200px] mx-auto px-8 lg:px-12 relative">
        <div className="max-w-[880px] mx-auto text-center">
          {/* Headline */}
          <motion.h1 
            {...fadeIn}
            className="text-[56px] lg:text-[72px] font-semibold text-white leading-[1.1] tracking-tight mb-6"
          >
            Empowering Small Businesses to{" "}
            <span className="text-purple-500">
              Grow Smarter
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[19px] lg:text-[21px] text-neutral-300 mb-10 leading-[1.6] max-w-[740px] mx-auto"
          >
            Pink & Purple helps entrepreneurs simplify business registration,
            automate operations, and unlock the tools they need to scale. Your
            business deserves a system that works as hard as you do.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#register"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl text-[16px] font-medium hover:bg-purple-700 transition-colors duration-200 shadow-lg"
            >
              Register Your Business
              <ArrowRight className="w-5 h-5" strokeWidth={2} />
            </motion.a>
            
            <motion.a
              href="#about"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-white border-2 border-neutral-700 px-8 py-4 rounded-xl text-[16px] font-medium hover:border-neutral-600 hover:bg-neutral-800 transition-all duration-200"
            >
              Learn More
            </motion.a>
          </motion.div>

          {/* Optional: Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-neutral-400 text-[14px]"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>100+ Businesses Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full" />
              <span>98% Client Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>24/7 Support</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}