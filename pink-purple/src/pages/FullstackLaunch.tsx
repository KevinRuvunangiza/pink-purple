import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  CheckCircle,
  TrendingUp,
  Zap,
  Target,
  Award,
  Calendar,
  Mail,
  Globe,
  Users,
  Layout,
  MessageSquare,
  User,
  TrendingDown,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import NavBarSolid from "../components/NavBarSolid";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";

export default function FullstackLaunch() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Scroll to section smoothly
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <NavBarSolid />
      <div className="min-h-screen bg-slate-50 text-slate-800">
        {/* Hero Section - Fusion of both designs */}
        <section className="relative pt-24 pb-32 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden mt-5">
          {/* Animated background blobs */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            variants={floatVariants}
            animate="animate"
          ></motion.div>
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            variants={floatVariants}
            animate="animate"
            style={{ animationDelay: "1s" }}
          ></motion.div>

          <motion.div
            className="container mx-auto max-w-6xl text-center relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              className="inline-block px-5 py-2 mb-6 text-xs font-bold tracking-widest text-purple-600 uppercase bg-purple-100 rounded-full shadow-sm"
              variants={scaleIn}
            >
              Business Consulting & Launch Acceleration
            </motion.span>

            <motion.h1
              className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight text-slate-900 leading-tight"
              variants={fadeInUp}
            >
              Move from Idea to Launch <br />
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                in Only 27 Days
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-slate-600 mb-6 max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              We bridge the gap between "hustle" and "enterprise." Stop
              struggling with administrative chaos and start scaling with
              automated structures designed for African SMEs.
            </motion.p>

            <motion.p
              className="text-xl md:text-2xl font-bold text-slate-900 mb-10 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              Pink & Purple delivers the complete foundation you need to launch
              big, professional, and profitable.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              variants={containerVariants}
            >
              <motion.button
                onClick={() => scrollToSection("packages")}
                className="bg-pink-600 text-white px-8 py-4 rounded-full font-bold hover:bg-pink-700 hover:shadow-xl transition-all text-lg transform hover:scale-105"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Launch Packages
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-20 bg-white">
          <motion.div
            className="container mx-auto px-4 max-w-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={slideInFromLeft}>
                <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
                  We Specialize in Ending{" "}
                  <span className="text-pink-600">Startup Chaos</span>
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Built by entrepreneurs and digital experts with{" "}
                  <strong>7+ years of collective experience</strong>, we provide
                  the entire foundation you need to start structured,
                  professional, and ready to scale.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  By removing administrative bottlenecks and implementing
                  automated structures, we empower you to focus on your passion,
                  not your paperwork.
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-100 shadow-lg"
                variants={slideInFromRight}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex items-center mb-4">
                  <Award className="w-8 h-8 text-purple-600 mr-3" />
                  <h3 className="text-2xl font-bold text-purple-600">
                    Our Commitment
                  </h3>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  To ensure every entrepreneur can start structured, we offer
                  three pathways. The <strong>Launch Accelerate Package</strong>{" "}
                  delivers everything you need for total confidence and maximum
                  value—positioning you for immediate growth and long-term
                  success.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Market Analysis Section */}
        <section className="py-20 bg-slate-50">
          <motion.div
            className="container mx-auto px-4 max-w-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <div className="flex flex-col md:flex-row gap-12 items-start">
              {/* Target Persona */}
              <motion.div
                className="w-full md:w-1/3"
                variants={slideInFromLeft}
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Target Market
                </h2>
                <motion.div
                  className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg sticky top-24"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <User className="w-12 h-12 text-pink-600 mb-4" />
                  <h3 className="text-xl font-bold text-pink-600 mb-3">
                    The "WhatsApp" Retailer
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    Fashion accessory entrepreneurs currently relying on manual
                    WhatsApp orders. They're making sales but drowning in admin.
                  </p>
                  <ul className="space-y-3 text-sm font-medium text-slate-700">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      1-5 Employees
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      1+ Year in Business
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Seeking Automation
                    </li>
                  </ul>
                </motion.div>
              </motion.div>

              {/* SWOT Analysis */}
              <motion.div
                className="w-full md:w-2/3"
                variants={slideInFromRight}
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Strategic SWOT
                </h2>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  variants={containerVariants}
                >
                  {[
                    {
                      icon: <TrendingUp className="w-6 h-6" />,
                      title: "Strengths",
                      color: "green",
                      items: [
                        "De-risking model via registration revenue",
                        "Niche focus on WhatsApp commerce",
                        "Lean, remote operations (Low overhead)",
                      ],
                    },
                    {
                      icon: <TrendingDown className="w-6 h-6" />,
                      title: "Weaknesses",
                      color: "red",
                      items: [
                        "Reliance on founder capacity initially",
                        "Lack of established case studies",
                        "Brand awareness starting from zero",
                      ],
                    },
                    {
                      icon: <TrendingUp className="w-6 h-6" />,
                      title: "Opportunities",
                      color: "blue",
                      items: [
                        "Booming African digital commerce",
                        "Upselling systemization to registration clients",
                        "Expansion into Nigeria & DRC",
                      ],
                    },
                    {
                      icon: <AlertTriangle className="w-6 h-6" />,
                      title: "Threats",
                      color: "orange",
                      items: [
                        "Price competition in CIPC registration",
                        "Economic instability in expansion markets",
                        "Regulatory changes",
                      ],
                    },
                  ].map((swot, idx) => (
                    <motion.div
                      key={idx}
                      className={`bg-${swot.color}-50 p-6 rounded-2xl border-l-4 border-${swot.color}-500 hover:shadow-lg transition-shadow`}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                    >
                      <h4
                        className={`font-bold text-${swot.color}-900 mb-3 flex items-center`}
                      >
                        <span className="mr-2">{swot.icon}</span>
                        {swot.title}
                      </h4>
                      <ul
                        className={`text-sm text-${swot.color}-800 space-y-2`}
                      >
                        {swot.items.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="py-24 bg-white">
          <motion.div
            className="container mx-auto px-4 max-w-7xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div
              className="text-center mb-16"
              variants={containerVariants}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4"
                variants={fadeInUp}
              >
                Launch Accelerate Packages
              </motion.h2>
              <motion.p
                className="text-xl text-slate-600 max-w-3xl mx-auto"
                variants={itemVariants}
              >
                Three pathways to launch. One commitment: your success.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {/* Package 1: Starter */}
              <motion.div
                className="bg-white rounded-3xl shadow-lg p-8 border-2 border-slate-200 hover:border-pink-300 transition-all hover:shadow-xl"
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Launch Starter
                </h3>
                <p className="text-slate-600 mb-6">
                  Essential Legal & Identity Setup
                </p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-slate-900">
                    R2,999
                  </span>
                  <span className="text-slate-500 ml-2">once-off</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-slate-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-pink-500 mr-2 flex-shrink-0 mt-0.5" />
                    CIPC Business Registration
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-pink-500 mr-2 flex-shrink-0 mt-0.5" />
                    Basic Brand Identity
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-pink-500 mr-2 flex-shrink-0 mt-0.5" />
                    Professional Email Setup
                  </li>
                </ul>
                <motion.button
                  onClick={() => setShowModal(true)}
                  className="w-full py-3 border-2 border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Select Starter
                </motion.button>
              </motion.div>

              {/* Package 2: Digital Foundations */}
              <motion.div
                className="bg-white rounded-3xl shadow-lg p-8 border-2 border-slate-200 hover:border-purple-300 transition-all hover:shadow-xl"
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Digital Foundations
                </h3>
                <p className="text-slate-600 mb-6">
                  Website & Digital Presence
                </p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-slate-900">
                    R5,999
                  </span>
                  <span className="text-slate-500 ml-2">once-off</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-slate-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                    Everything in Starter
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                    Professional Website Development
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                    Domain Registration (1 year)
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                    Social Media Profile Setup
                  </li>
                </ul>
                <motion.button
                  onClick={() => setShowModal(true)}
                  className="w-full py-3 border-2 border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Select Foundations
                </motion.button>
              </motion.div>

              {/* Package 3: Launch Accelerate (Featured) */}
              <motion.div
                className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl shadow-2xl p-8 border-4 border-white transform scale-105 relative"
                variants={itemVariants}
                whileHover={{
                  y: -15,
                  boxShadow: "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
                }}
              >
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="bg-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> BEST VALUE{" "}
                    <Sparkles className="w-3 h-3" />
                  </span>
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Launch Accelerate
                </h3>
                <p className="text-purple-200 mb-6 font-medium">
                  Full Compliance, Automation & Marketing
                </p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-white">
                    R11,499
                  </span>
                  <span className="text-purple-200 ml-2">once-off</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-white">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-pink-300 mr-2 flex-shrink-0 mt-0.5" />
                    Everything in Digital Foundations
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-pink-300 mr-2 flex-shrink-0 mt-0.5" />
                    CRM Automation Setup
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-pink-300 mr-2 flex-shrink-0 mt-0.5" />
                    Email Marketing Campaign
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-pink-300 mr-2 flex-shrink-0 mt-0.5" />
                    30-Day Content Calendar
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-pink-300 mr-2 flex-shrink-0 mt-0.5" />
                    5 Marketing Templates
                  </li>
                  <li className="flex items-start">
                    <Award className="w-5 h-5 text-pink-300 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="font-bold text-pink-300">
                      FREE 1-Hour Strategy Session
                    </span>
                  </li>
                </ul>
                <motion.button
                  onClick={() => setShowModal(true)}
                  className="w-full py-4 bg-white text-purple-900 rounded-xl font-bold text-lg hover:bg-pink-100 hover:text-pink-700 transition-all shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Secure This Package
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Full Stack Launch Timeline */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

          <motion.div
            className="container mx-auto px-4 max-w-6xl relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div
              className="text-center mb-16"
              variants={containerVariants}
            >
              <motion.span
                className="text-pink-400 font-bold tracking-widest text-xs uppercase border border-pink-400 px-3 py-1 rounded-full inline-block"
                variants={scaleIn}
              >
                Implementation Process
              </motion.span>
              <motion.h2
                className="text-4xl md:text-5xl font-extrabold mt-4 mb-6"
                variants={fadeInUp}
              >
                Execution Roadmap
              </motion.h2>
              <motion.p
                className="text-slate-300 max-w-2xl mx-auto text-lg"
                variants={itemVariants}
              >
                For serious entrepreneurs only. We build your entire business
                foundation in a structured, proven timeline.
              </motion.p>
            </motion.div>

            {/* Timeline */}
            <motion.div className="relative mb-20" variants={containerVariants}>
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-700 transform -translate-y-1/2"></div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-7 gap-6 relative"
                variants={containerVariants}
              >
                {[
                  {
                    num: 1,
                    title: "Brand Identity",
                    days: "Will vary based on client responsiveness",
                    color: "pink",
                  },
                  {
                    num: 2,
                    title: "Social Setup",
                    days: "Will vary based on client responsiveness",
                    color: "purple",
                  },
                  {
                    num: 3,
                    title: "Domain & Registration",
                    days: "Will vary based on client responsiveness",
                    color: "purple",
                  },
                  {
                    num: 4,
                    title: "Content Plan",
                    days: "Will vary based on client responsiveness",
                    color: "pink",
                  },
                  {
                    num: 5,
                    title: "CRM Setup",
                    days: "Will vary based on client responsiveness",
                    color: "pink",
                  },
                  {
                    num: 6,
                    title: "Email Marketing",
                    days: "Will vary based on client responsiveness",
                    color: "purple",
                  },
                  {
                    num: 7,
                    title: "Landing Page",
                    days: "Will vary based on client responsiveness",
                    color: "white",
                  },
                ].map((step) => (
                  <motion.div
                    key={step.num}
                    className="flex flex-col items-center group"
                    variants={itemVariants}
                  >
                    <motion.div
                      className={`w-14 h-14 bg-slate-800 border-2 ${
                        step.color === "pink"
                          ? "border-pink-500 group-hover:bg-pink-600"
                          : step.color === "purple"
                          ? "border-purple-500 group-hover:bg-purple-600"
                          : "border-white group-hover:bg-white group-hover:text-slate-900"
                      } rounded-full flex items-center justify-center font-bold text-lg mb-4 transition-all shadow-lg`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {step.num}
                    </motion.div>
                    <motion.div
                      className="text-center bg-slate-800 p-4 rounded-xl border border-slate-700 w-full hover:border-slate-500 transition-all"
                      whileHover={{ y: -5 }}
                    >
                      <div
                        className={`font-bold text-sm mb-1 ${
                          step.color === "pink"
                            ? "text-pink-400"
                            : step.color === "purple"
                            ? "text-purple-400"
                            : "text-white"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-slate-400">{step.days}</div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Feature Comparison Table */}
            <motion.div
              className="bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700"
              variants={fadeInUp}
            >
              <div className="p-8 text-center border-b border-slate-700">
                <h3 className="text-3xl font-bold">
                  Why Launch Accelerate is the Best Investment
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-slate-300">
                  <thead className="bg-slate-900 text-xs uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-6 py-4">Feature</th>
                      <th className="px-6 py-4 text-slate-500">Starter</th>
                      <th className="px-6 py-4 text-slate-400">Foundations</th>
                      <th className="px-6 py-4 text-white bg-pink-900/20 border-t-4 border-pink-500">
                        Accelerate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 text-sm">
                    {[
                      {
                        feature: "Legal Registration",
                        starter: "✅",
                        foundations: "✅",
                        accelerate: "✅",
                      },
                      {
                        feature: "Branding & Email",
                        starter: "✅",
                        foundations: "✅",
                        accelerate: "✅",
                      },
                      {
                        feature: "Landing Page",
                        starter: "❌",
                        foundations: "✅",
                        accelerate: "✅",
                      },
                      {
                        feature: "CRM Automation",
                        starter: "❌",
                        foundations: "❌",
                        accelerate: "✅ Full Logic",
                      },
                      {
                        feature: "Marketing Content",
                        starter: "❌",
                        foundations: "2 Templates",
                        accelerate: "5 Templates + Plan",
                      },
                      {
                        feature: "Strategic Bonus",
                        starter: "-",
                        foundations: "-",
                        accelerate: "FREE 1-Hr Strategy",
                      },
                    ].map((row, idx) => (
                      <motion.tr
                        key={idx}
                        className="hover:bg-slate-700/50 transition-colors"
                        whileHover={{
                          backgroundColor: "rgba(51, 65, 85, 0.3)",
                        }}
                      >
                        <td className="px-6 py-4 font-medium text-white">
                          {row.feature}
                        </td>
                        <td className="px-6 py-4 opacity-60">{row.starter}</td>
                        <td className="px-6 py-4">{row.foundations}</td>
                        <td className="px-6 py-4 bg-pink-900/10 font-bold text-white">
                          {row.accelerate}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div
              className="mt-12 flex justify-center"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => setShowModal(true)}
                className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-pink-50 hover:text-pink-600 transition-all shadow-lg transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Mandatory Consultation
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Financial Plan Section */}

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <motion.div
            className="container mx-auto px-4 max-w-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Timeline */}
              <motion.div variants={slideInFromLeft}>
                <h3 className="text-4xl font-extrabold text-slate-900 mb-3">
                  How It Works
                </h3>
                <p className="text-xl font-medium text-pink-600 mb-6">
                  3 Simple Steps
                </p>
                <p className="mb-8 font-semibold text-slate-600">
                  Time to Launch:{" "}
                  <span className="text-purple-600">14–27 Business Days</span>{" "}
                  from sign-up and document submission.
                </p>

                <motion.div className="space-y-8" variants={containerVariants}>
                  {[
                    {
                      num: 1,
                      title: "Sign Up & Submit Docs",
                      desc: "You sign up, and we handle the immediate paperwork, including CIPC registration.",
                      icon: <Calendar className="w-6 h-6" />,
                    },
                    {
                      num: 2,
                      title: "Design & Development",
                      desc: "We build your digital foundation, designing your site, setting up automation (CRM, email), and creating your brand identity.",
                      icon: <Layout className="w-6 h-6" />,
                    },
                    {
                      num: 3,
                      title: "Launch & Handover",
                      desc: "We hand over your fully structured business. You go live and start marketing with a professional system in place.",
                      icon: <Zap className="w-6 h-6" />,
                    },
                  ].map((step) => (
                    <motion.div
                      key={step.num}
                      className="flex gap-4 group"
                      variants={itemVariants}
                      whileHover={{ x: 10 }}
                    >
                      <motion.div
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                          {step.num}
                        </div>
                      </motion.div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center gap-2 mb-2">
                          <motion.div
                            className="text-purple-600"
                            whileHover={{ rotate: 10 }}
                          >
                            {step.icon}
                          </motion.div>
                          <h4 className="text-xl font-bold text-slate-900">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Testimonial & Bonus */}
              <motion.div variants={slideInFromRight}>
                <motion.div
                  className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-3xl shadow-xl mb-8 border-t-4 border-pink-500"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    What Our Clients Say
                  </h4>
                  <blockquote className="text-lg italic text-slate-700 mb-4">
                    "Pink & Purple took the headache out of the startup process.
                    We went from just an idea to a fully registered company with
                    a professional site in under three weeks. Absolute
                    game-changer!"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center text-pink-700 font-bold text-xl"
                      whileHover={{ scale: 1.1 }}
                    >
                      SM
                    </motion.div>
                    <div>
                      <p className="font-bold text-slate-900">S. Moloi</p>
                      <p className="text-sm text-slate-600">
                        Founder, Tech Solutions (Pty) Ltd.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-purple-900 to-pink-900 p-8 rounded-3xl text-white shadow-2xl"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="flex items-center mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="w-8 h-8 text-pink-300 mr-3" />
                    </motion.div>
                    <h4 className="text-2xl font-bold">Exclusive Bonus</h4>
                  </motion.div>
                  <h5 className="text-xl font-bold mb-3 text-pink-300">
                    Strategic Direction Session
                  </h5>
                  <p className="text-purple-100 leading-relaxed">
                    Every Launch Accelerate Package buyer receives a{" "}
                    <span className="font-extrabold text-white">
                      FREE 1-Hour Expert Consultation
                    </span>{" "}
                    for strategic direction. Get immediate, actionable solutions
                    on your operations, sales, or growth strategy—exclusive to
                    our clients.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Detailed Features Section */}
        <section className="py-20 bg-slate-50">
          <motion.div
            className="container mx-auto px-4 max-w-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h3
              className="text-4xl font-extrabold text-center text-slate-900 mb-4"
              variants={fadeInUp}
            >
              Launch Accelerate Package: Everything to Go Live
            </motion.h3>
            <motion.p
              className="text-center text-lg text-slate-600 mb-12 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              We bundle the essential systems, marketing foundations, and
              compliance required to build a structured, automated, and scalable
              business.
            </motion.p>

            <motion.div
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200"
              variants={fadeInUp}
            >
              <div className="hidden lg:grid lg:grid-cols-3 font-semibold text-sm text-slate-900 bg-purple-50 border-b border-purple-200 p-4">
                <div className="p-2">Feature</div>
                <div className="p-2">What We Deliver</div>
                <div className="p-2">Why This Matters</div>
              </div>

              <motion.div
                className="divide-y divide-slate-200"
                variants={containerVariants}
              >
                {[
                  {
                    icon: <Globe className="w-6 h-6" />,
                    feature: "Business Registration",
                    delivery:
                      "CIPC registration for Private/Public Companies and foundational guidance.",
                    why: "Essential for bank accounts and securing contracts.",
                    whyLabel: "Compliance & Credibility",
                  },
                  {
                    icon: <Camera className="w-6 h-6" />,
                    feature: "Professional Branding",
                    delivery:
                      "Logo Creation and Brand Identity (2 ready-made flyers included).",
                    why: "Professional visuals that attract and retain customers.",
                    whyLabel: "Instant Recognition",
                  },
                  {
                    icon: <Layout className="w-6 h-6" />,
                    feature: "Website Development",
                    delivery:
                      "A professional, modern, and mobile-responsive website design and launch.",
                    why: "Your 24/7 sales and information hub that builds trust.",
                    whyLabel: "Digital Headquarters",
                  },
                  {
                    icon: <Globe className="w-6 h-6" />,
                    feature: "Professional Domain",
                    delivery:
                      "We secure your unique domain name (e.g., .co.za) for one year.",
                    why: "Essential for digital identity and search engine visibility.",
                    whyLabel: "Brand Authority",
                  },
                  {
                    icon: <Mail className="w-6 h-6" />,
                    feature: "Professional Email",
                    delivery:
                      "Setup of branded email addresses (e.g., info@yourcompany.co.za).",
                    why: "Communicate with the professional excellence clients expect.",
                    whyLabel: "Trust & Security",
                  },
                  {
                    icon: <Users className="w-6 h-6" />,
                    feature: "Social Media Opening",
                    delivery:
                      "Setup of core social media profiles (Facebook, Instagram, LinkedIn).",
                    why: "Establishes your digital presence where customers are.",
                    whyLabel: "Audience Connection",
                  },
                  {
                    icon: <Target className="w-6 h-6" />,
                    feature: "Content Planning",
                    delivery:
                      "A 30-day content calendar and strategy to start your marketing with purpose.",
                    why: "Launch with a clear, strategic voice.",
                    whyLabel: "Immediate Engagement",
                  },
                  {
                    icon: <Mail className="w-6 h-6" />,
                    feature: "Email Marketing Setup",
                    delivery:
                      "Strategy, setup, and automated management of your first email campaign.",
                    why: "Essential tool for driving engagement and sales.",
                    whyLabel: "Client Conversion",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-0 p-6 hover:bg-pink-50 transition-colors group"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="text-purple-600 group-hover:text-pink-600 transition-colors"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="font-bold text-slate-900">
                        {item.feature}
                      </span>
                    </div>
                    <div className="text-slate-700 text-sm">
                      {item.delivery}
                    </div>
                    <div className="text-sm text-slate-600 lg:border-l-4 lg:border-purple-200 lg:pl-4">
                      <span className="font-semibold text-slate-800">
                        {item.whyLabel}:
                      </span>{" "}
                      {item.why}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-slate-50">
          <motion.div
            className="container mx-auto px-4 max-w-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div
              className="text-center mb-16"
              variants={containerVariants}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4"
                variants={fadeInUp}
              >
                Meet Our Team
              </motion.h2>
              <motion.p
                className="text-lg text-slate-600 max-w-3xl mx-auto"
                variants={itemVariants}
              >
                Experienced professionals with a proven track record of
                launching successful businesses and building digital solutions.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
              variants={containerVariants}
            >
              {[
                {
                  name: "Bliss Kipela",
                  role: "Founder & Business Strategy",
                  image: "👨‍💼",
                  bio: "7+ years in business consulting and SME development across Southern Africa.",
                  projects: [
                    { title: "E-Commerce Platform Launch", link: "#" },
                    { title: "SME Growth Acceleration Program", link: "#" },
                    { title: "Digital Transformation Initiative", link: "#" },
                  ],
                },
                {
                  name: "Micheal",
                  role: "Lead Designer & Branding",
                  image: "👩‍🎨",
                  bio: "Creative director specializing in brand identity and digital experiences for African startups.",
                  projects: [
                    { title: "Brand Identity System Design", link: "#" },
                    { title: "Fashion E-Commerce Site", link: "#" },
                    { title: "Tech Startup Rebranding", link: "#" },
                  ],
                },
                {
                  name: "Kevin Ruvunangiza",
                  role: "Full-Stack Developer",
                  image: "👨‍💻",
                  bio: "Full-stack engineer with expertise in building scalable automation systems and CRM integrations.",
                  projects: [
                    {
                      title: "StudentOS: Academic Toolkit",
                      link: "https://studentoss.netlify.app/",
                    },
                    { title: "Exp.me", link: "https://exp-me.netlify.app/" },
                    {
                      title: "Ukhuthula Medical Centre",
                      link: "https://ukuthulamedicalcenter.co.za/",
                    },
                  ],
                },
              ].map((member, idx) => (
                <motion.div key={idx} className="group" variants={itemVariants}>
                  <motion.div
                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:border-pink-300 transition-all flex flex-col"
                    whileHover={{
                      y: -8,
                      boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* Member Header */}
                    <motion.div
                      className="bg-gradient-to-r from-pink-50 to-purple-50 p-8 text-center"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="text-6xl mb-4"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", damping: 15 }}
                      >
                        {member.image}
                      </motion.div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-pink-600 font-semibold">
                        {member.role}
                      </p>
                    </motion.div>

                    {/* Member Info */}
                    <motion.div className="p-6 flex-1 flex flex-col">
                      <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        {member.bio}
                      </p>

                      {/* Projects List */}
                      <motion.details
                        className="group/details mt-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.summary
                          className="cursor-pointer font-bold text-slate-800 flex items-center justify-between hover:text-pink-600 transition-colors p-3 bg-slate-50 rounded-lg mb-3 select-none"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-sm uppercase tracking-wider">
                            Past Projects
                          </span>
                          <motion.span
                            className="text-slate-500 group-open/details:text-pink-600"
                            animate={{ rotate: 0 }}
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                          >
                            ▼
                          </motion.span>
                        </motion.summary>

                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {member.projects.map((project, pidx) => (
                            <motion.a
                              key={pidx}
                              href={project.link}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-pink-50 transition-colors group/link"
                              whileHover={{ x: 5 }}
                            >
                              <span className="text-pink-500 mt-1 shrink-0 font-bold flex gap-2">
                                →{" "}
                                <span className="text-sm text-slate-700 group-hover/link:text-pink-600 font-medium transition-colors line-clamp-2">
                                  {project.title}
                                </span>
                              </span>
                            </motion.a>
                          ))}
                        </motion.div>
                      </motion.details>
                    </motion.div>

                    {/* Contact CTA */}
                    <motion.div
                      className="px-6 pb-6"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.button
                        onClick={() => setShowModal(true)}
                        className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Connect With {member.name.split(" ")[0]}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <motion.div
            className="container mx-auto px-4 max-w-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-4xl font-bold text-slate-900 mb-10 text-center"
              variants={fadeInUp}
            >
              Critical Questions Answered
            </motion.h2>
            <motion.div className="space-y-4" variants={containerVariants}>
              {[
                {
                  question: "How do I know the branding will fit my vision?",
                  answer:
                    "We start with a detailed Brand Discovery Call to understand your target audience. We use a three-stage review process (Draft, Refinement, Final Approval) to ensure 100% satisfaction before proceeding.",
                },
                {
                  question: "Who owns the accounts after handover?",
                  answer:
                    "You own everything, 100%. All domains, social accounts, and CRM logins are created under your credentials. We act as implementers, and upon handover, we relinquish administrative control.",
                },
                {
                  question: "What if CIPC rejects my name?",
                  answer:
                    "We manage this risk by submitting multiple name options. If rejected, we immediately advise on next steps. While CIPC processes, we continue working on your branding and digital setup so time isn't lost.",
                },
                {
                  question: "What happens after the 27 days?",
                  answer:
                    "You receive complete access to all systems, detailed documentation, and training materials. We also offer optional monthly retainer packages for ongoing support, content creation, and system optimization.",
                },
              ].map((faq, idx) => (
                <motion.details
                  key={idx}
                  className="group bg-slate-50 rounded-xl border border-slate-200 hover:border-pink-300 transition-all"
                  variants={itemVariants}
                  whileHover={{
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <motion.summary
                    className="flex items-center justify-between cursor-pointer p-6 font-bold text-slate-800 group-open:text-pink-600"
                    whileHover={{ x: 5 }}
                  >
                    {faq.question}
                    <motion.span
                      className="ml-4 flex-shrink-0 text-slate-500"
                      animate={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                    >
                      ▼
                    </motion.span>
                  </motion.summary>
                  <motion.p
                    className="px-6 pb-6 text-slate-600 text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.p>
                </motion.details>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
          <motion.div
            className="container mx-auto px-4 max-w-5xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h3
              className="text-4xl sm:text-5xl font-extrabold text-white mb-6"
              variants={fadeInUp}
            >
              Stop Struggling. Start Scaling.
            </motion.h3>
            <motion.p
              className="text-xl text-purple-200 max-w-3xl mx-auto mb-10 leading-relaxed"
              variants={itemVariants}
            >
              Choose a partner committed to your success. Book a mandatory
              consultation to ensure we're the perfect fit for your business
              goals.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={containerVariants}
            >
              <motion.button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-purple-900 rounded-full text-lg font-bold hover:bg-pink-100 hover:text-pink-700 transition-all shadow-2xl transform hover:scale-105"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Strategy Call Now
              </motion.button>
              <motion.a
                href="mailto:info@pinkandpurple.co.za?subject=Inquiry about Launch Accelerate Package"
                className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-bold hover:bg-white hover:text-purple-900 transition-all"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5 mr-2" />
                {/*Hook this to Mailerlite */}
                Request A CallBack
              </motion.a>
            </motion.div>
            <motion.p
              className="text-purple-300 text-sm mt-6"
              variants={itemVariants}
            >
              No obligation. 100% Free consultation.
            </motion.p>
          </motion.div>
        </section>

        {/* Booking Modal */}
        <BookingModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </div>
      <motion.div>
        <Footer />
      </motion.div>
    </>
  );
}
