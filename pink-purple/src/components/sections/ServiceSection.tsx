import { motion } from "framer-motion";
import { FileText, Settings, Megaphone, Lightbulb } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className="group"
  >
    {/* Icon */}
    <div className="mb-5 flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600 text-white">
      {icon}
    </div>
    
    {/* Content */}
    <h3 className="text-[20px] font-semibold text-gray-900 mb-3 leading-tight">
      {title}
    </h3>
    <p className="text-gray-600 text-[16px] leading-relaxed">
      {description}
    </p>
  </motion.div>
);

export default function ServicesSection() {
  const services = [
    {
      icon: <FileText className="w-6 h-6" strokeWidth={2} />,
      title: 'Business Registration',
      description: 'Get your business registered and compliant with ease. We handle all the paperwork while you focus on your vision.'
    },
    {
      icon: <Settings className="w-6 h-6" strokeWidth={2} />,
      title: 'CRM Setup & Automation',
      description: 'Connect your tools, automate workflows, and manage customer relationships effortlessly.'
    },
    {
      icon: <Megaphone className="w-6 h-6" strokeWidth={2} />,
      title: 'Marketing & Branding',
      description: 'From digital marketing to professional branding, we position your business for growth and visibility.'
    },
    {
      icon: <Lightbulb className="w-6 h-6" strokeWidth={2} />,
      title: 'Consulting & Strategy',
      description: 'Personalized business strategy sessions to identify growth opportunities and system improvements.'
    }
  ];

  return (
    <section id="services" className="py-28 lg:py-36 bg-white">
      <div className="max-w-[1200px] mx-auto px-8 lg:px-12">
        {/* Section Header */}
        <motion.div {...fadeIn} className="mb-20 max-w-[720px]">
          <h2 className="text-[48px] lg:text-[56px] font-semibold text-gray-900 mb-5 leading-[1.1] tracking-tight">
            What We Do
          </h2>
          <p className="text-[19px] text-gray-600 leading-[1.5]">
            We provide all-in-one business solutions that help you start, manage, and grow seamlessly.
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}