import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import {
  Check,
  Sparkles,
  DollarSign,
  Shield,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  Zap,
  Target,
  Award,
  AlarmClock,
  FormInput,
  MailQuestionMarkIcon,
} from "lucide-react";
import CTASection from "../components/sections/CTASection";
import Footer from "../components/Footer";
import { Link } from "react-router";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const PainPointCard = ({ icon, title, description, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className="group relative p-8 rounded-3xl bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm border border-neutral-700/50 hover:border-purple-500/50 transition-all duration-500 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/5 group-hover:to-pink-600/5 transition-all duration-500" />
    <div className="relative z-10">
      <div
        className={`text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-neutral-400 text-base leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
);

const StepCard = ({ number, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className="relative bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-purple-100 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-500 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
      {number}
    </div>
    <h3 className="relative z-10 text-2xl font-bold text-slate-800 mb-4">
      {title}
    </h3>
    <p className="relative z-10 text-slate-600 text-base leading-relaxed">
      {description}
    </p>
  </motion.div>
);

const PricingCard = ({
  title,
  price,
  features,
  isPrimary,
  buttonText,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`relative bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-xl border-2 flex flex-col justify-between transform hover:scale-105 transition-all duration-500 overflow-hidden ${
      isPrimary
        ? "border-purple-400 shadow-purple-200/50"
        : "border-pink-300 shadow-pink-200/50"
    }`}
  >
    {isPrimary && (
      <div className="absolute top-0 right-0 bg-gradient-to-br from-purple-600 to-pink-600 text-white px-6 py-2 text-sm font-bold rounded-bl-2xl">
        POPULAR
      </div>
    )}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <h3
        className={`text-3xl font-bold mb-6 ${
          isPrimary ? "text-purple-600" : "text-pink-600"
        }`}
      >
        {title}
      </h3>
      <div className="flex items-baseline mb-8">
        <span className="text-6xl font-extrabold text-slate-900">R{price}</span>
        <span className="text-slate-500 ml-2">/once</span>
      </div>
      <ul className="text-slate-600 text-left space-y-4 mb-10">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check
              className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
              strokeWidth={2.5}
            />
            <span className="text-base leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
    <Link to="next-steps">
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative z-10 w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
        isPrimary
          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-purple-500/50"
          : "bg-white border-2 border-pink-500 text-pink-600 hover:bg-pink-50"
      }`}
    >
      {buttonText}
    </motion.button>
    </Link>
  </motion.div>
);

const BenefitCard = ({ icon, title, description, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className="relative p-8 rounded-3xl bg-white/90 backdrop-blur-sm shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-500 overflow-hidden group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div
      className={`relative z-10 mb-6 ${color} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
    >
      {icon}
    </div>
    <h3 className="relative z-10 font-bold text-xl mb-4 text-slate-900">
      {title}
    </h3>
    <p className="relative z-10 text-slate-600 text-base leading-relaxed">
      {description}
    </p>
  </motion.div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md border border-purple-100 hover:shadow-xl transition-all duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left group"
      >
        <span className="font-bold text-xl text-slate-900 pr-4 group-hover:text-purple-600 transition-colors duration-300">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-6 h-6 text-purple-600" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="mt-6 text-slate-600 leading-relaxed text-base">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default function LandingPage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="bg-slate-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden">
        {/* Animated background with subtle glows */}
        <div className="absolute inset-0">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-neutral-950 to-pink-950/30" />

          {/* Animated glow orbs */}
          <motion.div
            style={{ y: heroY }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"
          />
          <motion.div
            style={{ y: heroY }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px]"
          />

          {/* Additional subtle accent glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px]" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 py-32 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">
              Trusted by 100+ businesses
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8"
          >
            Your Business,
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
             But Way Less Headache.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl lg:text-2xl text-neutral-300 mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            Simplify business registration, automate operations, and unlock the
            tools you need to scale. Your business deserves better.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/next-steps">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(168, 85, 247, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 flex items-center gap-3"
            >
              Register Your Business
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
            </Link>

            <Link to="/about">
             <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-white/10 backdrop-blur-md text-white text-lg font-bold rounded-2xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Learn More
            </motion.button>
            </Link>
           
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              {
                icon: <Target className="w-6 h-6" />,
                label: "100+ Businesses",
                color: "from-purple-400 to-purple-600",
              },
              {
                icon: <Award className="w-6 h-6" />,
                label: "98% Satisfaction",
                color: "from-pink-400 to-pink-600",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                label: "24/7 Support",
                color: "from-purple-400 to-pink-400",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-3 text-white"
              >
                <div
                  className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}
                >
                  {stat.icon}
                </div>
                <span className="font-semibold">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1 },
            y: { repeat: Infinity, duration: 2 },
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>
      </section>

      {/* Pain Points Section */}
      <section className="relative py-32 bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.1),transparent_50%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12">
          <motion.div {...fadeIn} className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-semibold mb-6"
            >
              Common Struggles
            </motion.span>
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6">
              Tired of the Registration
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400">
                Roadblock?
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PainPointCard
              icon={<FormInput size={50} color="white"/>}
              title="Confusing Forms"
              description="Wrestling with endless CIPC paperwork feels like solving a puzzle with missing pieces."
              color="text-red-400"
              delay={0}
            />
            <PainPointCard
              icon={<AlarmClock size={50} color="white"/>}
              title="Wasted Time"
              description="Hours spent trying to figure things out, when you could be building your actual business."
              color="text-orange-400"
              delay={0.1}
            />
            <PainPointCard
              icon={<MailQuestionMarkIcon size={50} color="white"/>}
              title="Uncertainty"
              description="Are you doing it right? What if your name is rejected? The worry is real!"
              color="text-blue-400"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-32 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-[150px] opacity-30" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-300 rounded-full blur-[150px] opacity-30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12">
          <motion.div {...fadeIn} className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block px-4 py-2 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-600 font-semibold mb-6"
            >
              Simple Process
            </motion.span>
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6">
              As Easy as{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                1-2-3
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We've simplified the entire process so you can get official
              without the stress
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number={1}
              title="Fill Our Simple Form"
              description="Tell us about your dream business in minutes with our user-friendly online form. No jargon, just clarity!"
              delay={0}
            />
            <StepCard
              number={2}
              title="Make Your Payment"
              description="Securely pay through Paystack. Quick, easy, and transparent pricing – no hidden fees!"
              delay={0.1}
            />
            <StepCard
              number={3}
              title="Sign & Get Registered"
              description="We prepare the documents, you sign, and we submit to CIPC. You'll be official in no time!"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.05),transparent_50%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12">
          <motion.div {...fadeIn} className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block px-4 py-2 rounded-full bg-green-600/10 border border-green-600/20 text-green-600 font-semibold mb-6"
            >
              Transparent Pricing
            </motion.span>
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6">
              Clear Pricing.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Real Value.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <PricingCard
              title="Private Company"
              price="650"
              features={[
                "CIPC Name Reservation & Registration",
                "SARS Income Tax Registration",
                "B-BBEE Certificate Guidance (EME)",
                "Expert Document Preparation",
                "Full Support & Guidance",
              ]}
              isPrimary={true}
              buttonText="Register Pty Ltd"
              delay={0}
            />
            <PricingCard
              title="Public Company"
              price="850"
              features={[
                "CIPC Name Reservation & Registration",
                "SARS Income Tax Registration",
                "B-BBEE Certificate Guidance (EME)",
                "Expert Document Preparation",
                "Full Support & Guidance",
              ]}
              isPrimary={false}
              buttonText="Register Public Co."
              delay={0.1}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-slate-500 text-sm mt-16 font-medium"
          >
            *CIPC fees included. No hidden surprises!
          </motion.p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-32 bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6">
              Why Register
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Your Business?
              </span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Beyond ticking a box, official registration unlocks serious
              advantages
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BenefitCard
              icon={<Sparkles className="w-12 h-12" strokeWidth={2} />}
              title="Instant Credibility"
              description="Look professional to clients and partners from day one. No more 'side hustle' vibes!"
              color="text-pink-600"
              delay={0}
            />
            <BenefitCard
              icon={<DollarSign className="w-12 h-12" strokeWidth={2} />}
              title="Access Funding"
              description="Banks and investors prefer registered entities. Get ready for loans and opportunities!"
              color="text-purple-600"
              delay={0.1}
            />
            <BenefitCard
              icon={<Shield className="w-12 h-12" strokeWidth={2} />}
              title="Legal Protection"
              description="Separate your personal assets from business liabilities. Sleep easier at night!"
              color="text-pink-600"
              delay={0.2}
            />
            <BenefitCard
              icon={<TrendingUp className="w-12 h-12" strokeWidth={2} />}
              title="Future Growth"
              description="Foundation for accounting, tax compliance, and powerful automation systems!"
              color="text-purple-600"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="relative py-32 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-40 left-40 w-96 h-96 bg-purple-300 rounded-full blur-[150px] opacity-20" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-8 lg:px-12">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6">
              Got{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Questions?
              </span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            <FAQItem
              question="What documents do I need to register?"
              answer="You'll typically need a copy of your ID (certified for foreigners), proof of residence, and your preferred business names. We'll guide you on exactly what's needed after you sign up!"
            />
            <FAQItem
              question="Can I register if I'm not in South Africa?"
              answer="Yes! We can assist non-residents with registering a company in South Africa, provided you meet the CIPC requirements and can supply the necessary certified documents."
            />
            <FAQItem
              question="What if my business name is taken?"
              answer="No stress! That's why we ask for up to 5 names in order of preference. If your first choice isn't available, CIPC will check your next option."
            />
            <FAQItem
              question="Do you help with tax registration?"
              answer="Absolutely! When you register a Pty Ltd with us, your business is automatically registered with SARS for income tax. We'll provide complete guidance."
            />
            <FAQItem
              question="Is your service fully online?"
              answer="Yes! Our entire process, from filling out the form to signing documents and receiving your final papers, is handled conveniently online. No office visits needed!"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection />
      {/* Footer */}
      <Footer />
    </div>
  );
}
