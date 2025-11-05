import { motion } from "framer-motion";
import { Sparkles, Users, Shield, TrendingUp } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className="group"
  >
    <div className="relative bg-neutral-800 rounded-2xl p-8 border border-neutral-700 group-hover:border-neutral-600 transition-colors duration-300">
      {/* Icon */}
      <div className="mb-5 flex items-center justify-center w-12 h-12 rounded-xl bg-brand-purple-700 text-white">
        {icon}
      </div>
      
      {/* Content */}
      <h3 className="text-[20px] font-semibold text-white mb-3 leading-tight">
        {title}
      </h3>
      <p className="text-neutral-400 text-[16px] leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
);

interface StatItemProps {
  number: string;
  label: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ number, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className="text-center"
  >
    <div className="text-[40px] lg:text-[48px] font-bold text-pink-600 mb-2">
      {number}
    </div>
    <div className="text-neutral-400 text-[15px] font-medium">
      {label}
    </div>
  </motion.div>
);

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" strokeWidth={2} />,
      title: "Tailored for Your Business",
      description: "Every solution we build is customized to match your goals — not a template."
    },
    {
      icon: <Users className="w-6 h-6" strokeWidth={2} />,
      title: "Real Support",
      description: "You'll always talk to real humans who care about your success."
    },
    {
      icon: <Shield className="w-6 h-6" strokeWidth={2} />,
      title: "Transparent Pricing",
      description: "Simple, predictable pricing with no hidden fees or surprises."
    },
    {
      icon: <TrendingUp className="w-6 h-6" strokeWidth={2} />,
      title: "Built to Grow",
      description: "Our technology and team scale with you — from first launch to full growth."
    }
  ];

  const stats = [
    { number: "100+", label: "Businesses Empowered" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <section className="py-28 lg:py-36 bg-neutral-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.08),transparent_50%)]" />
      
      <div className="max-w-[1200px] mx-auto px-8 lg:px-12 relative">
        {/* Heading Section */}
        <motion.div {...fadeIn} className="mb-16 text-center max-w-[780px] mx-auto">
          <h2 className="text-[48px] lg:text-[56px] font-semibold text-white mb-5 leading-[1.1] tracking-tight">
            Why Choose{" "}
            <span className="text-pink-600">
              Pink & 
            </span>
            <span className="text-brand-purple-700"> Purple</span>
          </h2>
          
          <p className="text-[19px] text-neutral-400 leading-[1.5]">
            We focus on clarity, quality, and real growth — no buzzwords, no fluff.
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-8 mb-20 max-w-[900px] mx-auto">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              number={stat.number}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-[1100px] mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}