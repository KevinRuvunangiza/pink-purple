import { motion } from 'framer-motion';
import { Eye, Target, Check } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

interface ValueItemProps {
  value: string;
  index: number;
}

const ValueItem: React.FC<ValueItemProps> = ({ value, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -8 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-start gap-3 py-2"
  >
    <Check className="w-5 h-5 text-brand-purple-700 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
    <span className="text-gray-700 text-[17px] leading-relaxed">{value}</span>
  </motion.div>
);

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Card: React.FC<CardProps> = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className="group"
  >
    <div className="mb-4">
      {icon}
    </div>
    <h3 className="text-[22px] font-semibold text-gray-900 mb-3 leading-tight">
      {title}
    </h3>
    <p className="text-gray-600 text-[17px] leading-relaxed">
      {description}
    </p>
  </motion.div>
);

export default function WhoWeAre() {
  const coreValues = [
    'Integrity and Transparency',
    'Professionalism',
    'Simplicity and Innovation',
    'Empowerment through Knowledge'
  ];

  return (
    <section className="py-28 lg:py-36 bg-white">
      <div className="max-w-[1200px] mx-auto px-8 lg:px-12">
        {/* Heading Section */}
        <motion.div {...fadeIn} className="mb-20">
          <h2 className="text-[56px] lg:text-[72px] font-semibold text-gray-900 mb-6 leading-[1.1] tracking-tight">
            Who We Are
          </h2>
          
          <p className="text-[21px] text-gray-600 leading-[1.6] max-w-[840px]">
            Pink & Brand-purple is a South African-based business solutions company helping small and medium enterprises (SMEs) establish strong foundations. From company registration and system automation to CRM setup and digital marketing, we empower businesses with structure, technology, and strategic guidance.
          </p>
        </motion.div>
        
        {/* Vision & Mission */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 mb-28">
          <Card
            icon={
              <div className="w-12 h-12 bg-brand-purple-700 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
            }
            title="Our Vision"
            description="To create a future where entrepreneurs run efficient, automated, and sustainable businesses."
            delay={0.2}
          />
          
          <Card
            icon={
              <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
            }
            title="Our Mission"
            description="To simplify business growth through technology, automation, and personalized support."
            delay={0.3}
          />
        </div>
        
        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-[32px] font-semibold text-gray-900 mb-8 leading-tight">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-2 max-w-[900px]">
            {coreValues.map((value, index) => (
              <ValueItem key={index} value={value} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}