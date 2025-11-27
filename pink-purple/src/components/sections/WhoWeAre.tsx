import { m } from "framer-motion";
import {
  Eye,
  Target,
  Check,
  Sparkles,
  Heart,
  Lightbulb,
  Users,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

interface ValueItemProps {
  value: string;
  index: number;
}

const ValueItem: React.FC<ValueItemProps> = ({ value, index }) => (
  <m.div
    initial={{ opacity: 0, x: -8 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-start gap-3 py-2 group"
  >
    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
      <Check className="w-3 h-3 text-white" strokeWidth={3} />
    </div>
    <span className="text-gray-700 text-[17px] leading-relaxed">{value}</span>
  </m.div>
);

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Card: React.FC<CardProps> = ({ icon, title, description, delay }) => (
  <m.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className="group relative"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative p-8 rounded-2xl border border-gray-100 group-hover:border-brand-purple-200 transition-colors duration-500">
      <div className="mb-5 transform group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-[22px] font-semibold text-gray-900 mb-3 leading-tight group-hover:text-brand-purple-700 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 text-[17px] leading-relaxed">{description}</p>
    </div>
  </m.div>
);

interface CommitmentCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const CommitmentCard: React.FC<CommitmentCardProps> = ({
  icon,
  title,
  description,
  index,
}) => (
  <m.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="group"
  >
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-purple-600 to-pink-600 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-[19px] font-semibold text-gray-900 mb-2 group-hover:text-brand-purple-700 transition-colors duration-300">
          {title}
        </h4>
        <p className="text-[17px] text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </m.div>
);

export default function WhoWeAre() {
  const coreValues = [
    "Integrity and Transparency",
    "Professionalism",
    "Simplicity and Innovation",
    "Empowerment through Knowledge",
  ];

  const commitmentPoints = [
    {
      icon: <Sparkles className="w-6 h-6 text-white" strokeWidth={2} />,
      title: "Entrepreneurial Engine",
      description:
        "We understand that entrepreneurship is the essential engine of a thriving economy, driving innovation and prosperity across South Africa and the globe.",
    },
    {
      icon: <Heart className="w-6 h-6 text-white" strokeWidth={2} />,
      title: "Societal Movement",
      description:
        "This is more than a social responsibility—it's a societal movement driven by our belief that the power of innovation belongs in the hands of the next generation.",
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-white" strokeWidth={2} />,
      title: "Education to Execution",
      description:
        "We're committed to making the entrepreneurial path easier and more accessible, transforming aspiration into achievement through education and support.",
    },
    {
      icon: <Users className="w-6 h-6 text-white" strokeWidth={2} />,
      title: "Building Leaders",
      description:
        "Our goal is not simply to create business founders, but to forge successful business leaders who embody continuous learning and lasting impact.",
    },
  ];

  return (
    <section className="py-28 lg:py-36 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl" />

      <div className="max-w-[1200px] mx-auto px-8 lg:px-12 relative">
        {/* Heading Section */}
        <m.div {...fadeIn} className="mb-20">
          <div className="inline-block mb-4"></div>

          <h2 className="text-[56px] lg:text-[72px] font-semibold text-gray-900 mb-6 leading-[1.1] tracking-tight">
            Who We Are
          </h2>

          <div className="space-y-6">
            <p className="text-[21px] text-gray-600 leading-[1.6] max-w-[840px]">
              Pink & Purple is a South African-based business solutions company
              helping small and medium enterprises (SMEs) establish strong
              foundations. From company registration and system automation to
              CRM setup and digital marketing, we empower businesses with
              structure, technology, and strategic guidance.
            </p>

            <p className="text-[21px] text-gray-700 leading-[1.6] max-w-[840px] font-medium">
              We were founded on the belief that running a business should not
              be a struggle for survival, but a structured path to success.
            </p>

            <p className="text-[21px] text-gray-600 leading-[1.6] max-w-[840px]">
              We specialize in ending the chaos of the startup phase. Our goal
              is simple: to make entrepreneurship less complicated so you can
              focus on what matters most: building a legacy while doing what you
              love.
            </p>

            <div className="pt-4 pl-6 border-l-4 border-gradient-to-b from-brand-purple-500 to-pink-500">
              <p className="text-[20px] text-gray-700 leading-[1.65] max-w-[800px] italic">
                A trusted partner like Pink & Purple can be a lifesaver. We
                don't just help you with the registration; we provide the
                structure and automation to simplify these critical processes,
                from company registration to running your business and beyond.
              </p>
            </div>
          </div>
        </m.div>

        {/* Vision & Mission */}
        <div className="grid lg:grid-cols-2 gap-8 mb-28">
          <Card
            icon={
              <div className="w-14 h-14 bg-gradient-to-br from-brand-purple-600 to-brand-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-purple-200">
                <Eye className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
            }
            title="Our Vision"
            description="To create a future where entrepreneurs run efficient, automated, and sustainable businesses that drive lasting impact."
            delay={0.2}
          />

          <Card
            icon={
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-200">
                <Target className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
            }
            title="Our Mission"
            description="To simplify business growth through technology, automation, and personalized support that empowers every entrepreneur."
            delay={0.3}
          />
        </div>

        {/* Core Values */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-28"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-brand-purple-600 to-pink-600 rounded-full" />
            <h3 className="text-[32px] font-semibold text-gray-900 leading-tight">
              Our Core Values
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-3 max-w-[900px]">
            {coreValues.map((value, index) => (
              <ValueItem key={index} value={value} index={index} />
            ))}
          </div>
        </m.div>

        {/* Our Commitment */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-50/50 to-pink-50/50 rounded-3xl -m-8 blur-2xl opacity-50" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-gradient-to-b from-brand-purple-600 to-pink-600 rounded-full" />
              <h3 className="text-[32px] font-semibold text-gray-900 leading-tight">
                Our Commitment
              </h3>
            </div>

            <div className="max-w-[1000px] mb-12">
              <p className="text-[20px] text-gray-700 leading-[1.7] font-medium mb-6">
                At Pink & Purple, a modern marketing and automation company, we
                understand that entrepreneurship is the essential engine of a
                thriving economy.
              </p>
              <p className="text-[18px] text-gray-600 leading-[1.7]">
                Our core commitment goes beyond our services: it is to address
                the persistent need for entrepreneurial development in South
                Africa and across the globe. We firmly believe that the next
                wave of economic growth and societal prosperity depends entirely
                on empowering young entrepreneurs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-[1000px]">
              {commitmentPoints.map((point, index) => (
                <CommitmentCard key={index} {...point} index={index} />
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
