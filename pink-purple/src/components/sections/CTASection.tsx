import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
};

export default function CTASection() {
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
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-8 lg:px-12 relative">
        <motion.div 
          {...fadeIn}
          className="max-w-[780px] mx-auto text-center"
        >
          {/* Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[48px] lg:text-[64px] font-semibold text-white mb-6 leading-[1.1] tracking-tight"
          >
            Ready to Build Your Business the Smart Way?
          </motion.h2>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[19px] text-purple-100 mb-10 leading-[1.5]"
          >
            Get your company up and running in days, not weeks.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.a
              href="#register"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-flex items-center justify-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-xl text-[17px] font-semibold hover:bg-purple-50 transition-colors duration-200 shadow-lg"
            >
              Start Registration
              <ArrowRight className="w-5 h-5" strokeWidth={2} />
            </motion.a>
          </motion.div>

          {/* Optional: Trust indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-purple-200 text-[14px] mt-6"
          >
            Join 100+ businesses already growing with Pink & Purple
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}