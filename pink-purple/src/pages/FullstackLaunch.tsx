import React, { useState, useEffect } from 'react';
import { Camera, CheckCircle, TrendingUp, Zap, Target, Award, Calendar, Mail, Globe, Users, Layout, MessageSquare } from 'lucide-react';
import NavBarSolid from '../components/NavBarSolid';
import Footer from '../components/Footer';

export default function FullstackLaunch(){
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Scroll to section smoothly
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
    <NavBarSolid />
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Section - Fusion of both designs */}
      <section className="relative pt-24 pb-32 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <span className="inline-block px-5 py-2 mb-6 text-xs font-bold tracking-widest text-purple-600 uppercase bg-purple-100 rounded-full shadow-sm">
            Business Consulting & Launch Acceleration
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight text-slate-900 leading-tight">
            Move from Idea to Launch <br />
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              in Only 27 Days
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-6 max-w-3xl mx-auto leading-relaxed">
            We bridge the gap between "hustle" and "enterprise." Stop struggling with administrative chaos and start scaling with automated structures designed for African SMEs.
          </p>
          
          <p className="text-xl md:text-2xl font-bold text-slate-900 mb-10 max-w-4xl mx-auto">
            Pink & Purple delivers the complete foundation you need to launch big, professional, and profitable.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => scrollToSection('packages')}
              className="bg-pink-600 text-white px-8 py-4 rounded-full font-bold hover:bg-pink-700 hover:shadow-xl transition-all text-lg transform hover:scale-105"
            >
              View Launch Packages
            </button>
            <button 
              onClick={() => scrollToSection('financials')}
              className="bg-white text-slate-700 border-2 border-slate-300 px-8 py-4 rounded-full font-bold hover:bg-slate-50 hover:border-purple-400 transition-all text-lg"
            >
              See Financial Plan
            </button>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
                We Specialize in Ending <span className="text-pink-600">Startup Chaos</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Built by entrepreneurs and digital experts with <strong>7+ years of collective experience</strong>, we provide the entire foundation you need to start structured, professional, and ready to scale.
              </p>
              <p className="text-slate-600 leading-relaxed">
                By removing administrative bottlenecks and implementing automated structures, we empower you to focus on your passion, not your paperwork.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-100 shadow-lg">
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-purple-600">Our Commitment</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                To ensure every entrepreneur can start structured, we offer three pathways. The <strong>Launch Accelerate Package</strong> delivers everything you need for total confidence and maximum value—positioning you for immediate growth and long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Analysis Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Target Persona */}
            <div className="w-full md:w-1/3">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Target Market</h2>
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg sticky top-24">
                <div className="text-5xl mb-4">👤</div>
                <h3 className="text-xl font-bold text-pink-600 mb-3">The "WhatsApp" Retailer</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Fashion accessory entrepreneurs currently relying on manual WhatsApp orders. They're making sales but drowning in admin.
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
              </div>
            </div>

            {/* SWOT Analysis */}
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Strategic SWOT</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50 p-6 rounded-2xl border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-green-900 mb-3 flex items-center">
                    <span className="text-2xl mr-2">🟢</span> Strengths
                  </h4>
                  <ul className="text-sm text-green-800 space-y-2">
                    <li>• De-risking model via registration revenue</li>
                    <li>• Niche focus on WhatsApp commerce</li>
                    <li>• Lean, remote operations (Low overhead)</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-6 rounded-2xl border-l-4 border-red-500 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-red-900 mb-3 flex items-center">
                    <span className="text-2xl mr-2">🔴</span> Weaknesses
                  </h4>
                  <ul className="text-sm text-red-800 space-y-2">
                    <li>• Reliance on founder capacity initially</li>
                    <li>• Lack of established case studies</li>
                    <li>• Brand awareness starting from zero</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                    <span className="text-2xl mr-2">📈</span> Opportunities
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>• Booming African digital commerce</li>
                    <li>• Upselling systemization to registration clients</li>
                    <li>• Expansion into Nigeria & DRC</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-2xl border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-orange-900 mb-3 flex items-center">
                    <span className="text-2xl mr-2">⚠️</span> Threats
                  </h4>
                  <ul className="text-sm text-orange-800 space-y-2">
                    <li>• Price competition in CIPC registration</li>
                    <li>• Economic instability in expansion markets</li>
                    <li>• Regulatory changes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Launch Accelerate Packages
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Three pathways to launch. One commitment: your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Package 1: Starter */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-slate-200 hover:border-pink-300 transition-all hover:shadow-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Launch Starter</h3>
              <p className="text-slate-600 mb-6">Essential Legal & Identity Setup</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-slate-900">R2,999</span>
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
              <button 
                onClick={() => setShowModal(true)}
                className="w-full py-3 border-2 border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-all"
              >
                Select Starter
              </button>
            </div>

            {/* Package 2: Digital Foundations */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-slate-200 hover:border-purple-300 transition-all hover:shadow-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Digital Foundations</h3>
              <p className="text-slate-600 mb-6">Website & Digital Presence</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-slate-900">R5,999</span>
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
              <button 
                onClick={() => setShowModal(true)}
                className="w-full py-3 border-2 border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-all"
              >
                Select Foundations
              </button>
            </div>

            {/* Package 3: Launch Accelerate (Featured) */}
            <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl shadow-2xl p-8 border-4 border-white transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                  ✨ BEST VALUE ✨
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Launch Accelerate</h3>
              <p className="text-purple-200 mb-6 font-medium">Full Compliance, Automation & Marketing</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-white">R11,499</span>
                <span className="text-purple-200 ml-2">once-off</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-white">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  Everything in Digital Foundations
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  CRM Automation Setup
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  Email Marketing Campaign
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  30-Day Content Calendar
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  5 Marketing Templates
                </li>
                <li className="flex items-start">
                  <Award className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="font-bold text-yellow-400">FREE 1-Hour Strategy Session</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowModal(true)}
                className="w-full py-4 bg-white text-purple-900 rounded-xl font-bold text-lg hover:bg-yellow-400 hover:text-slate-900 transition-all shadow-lg"
              >
                Secure This Package
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Full Stack Launch Timeline */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <span className="text-pink-400 font-bold tracking-widest text-xs uppercase border border-pink-400 px-3 py-1 rounded-full">
              Implementation Process
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6">14-27 Day Execution Roadmap</h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              For serious entrepreneurs only. We build your entire business foundation in a structured, proven timeline.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mb-20">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-700 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-7 gap-6 relative">
              {[
                { num: 1, title: 'Brand Identity', days: 'Days 1-3', color: 'pink' },
                { num: 2, title: 'Social Setup', days: 'Days 4-5', color: 'purple' },
                { num: 3, title: 'Domain & Email', days: 'Days 6-7', color: 'purple' },
                { num: 4, title: 'Content Plan', days: 'Days 8-10', color: 'pink' },
                { num: 5, title: 'Email Marketing', days: 'Days 11-13', color: 'pink' },
                { num: 6, title: 'CRM Setup', days: 'Days 14-17', color: 'purple' },
                { num: 7, title: 'Landing Page', days: 'Day 24+', color: 'white' }
              ].map((step) => (
                <div key={step.num} className="flex flex-col items-center group">
                  <div className={`w-14 h-14 bg-slate-800 border-2 ${
                    step.color === 'pink' ? 'border-pink-500 group-hover:bg-pink-600' :
                    step.color === 'purple' ? 'border-purple-500 group-hover:bg-purple-600' :
                    'border-white group-hover:bg-white group-hover:text-slate-900'
                  } rounded-full flex items-center justify-center font-bold text-lg mb-4 transition-all shadow-lg`}>
                    {step.num}
                  </div>
                  <div className="text-center bg-slate-800 p-4 rounded-xl border border-slate-700 w-full hover:border-slate-500 transition-all">
                    <div className={`font-bold text-sm mb-1 ${
                      step.color === 'pink' ? 'text-pink-400' :
                      step.color === 'purple' ? 'text-purple-400' :
                      'text-white'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-slate-400">{step.days}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            <div className="p-8 text-center border-b border-slate-700">
              <h3 className="text-3xl font-bold">Why Launch Accelerate is the Best Investment</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-slate-300">
                <thead className="bg-slate-900 text-xs uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-4">Feature</th>
                    <th className="px-6 py-4 text-slate-500">Starter</th>
                    <th className="px-6 py-4 text-slate-400">Foundations</th>
                    <th className="px-6 py-4 text-white bg-pink-900/20 border-t-4 border-pink-500">Accelerate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700 text-sm">
                  {[
                    { feature: 'Legal Registration', starter: '✅', foundations: '✅', accelerate: '✅' },
                    { feature: 'Branding & Email', starter: '✅', foundations: '✅', accelerate: '✅' },
                    { feature: 'Landing Page', starter: '❌', foundations: '✅', accelerate: '✅' },
                    { feature: 'CRM Automation', starter: '❌', foundations: '❌', accelerate: '✅ Full Logic' },
                    { feature: 'Marketing Content', starter: '❌', foundations: '2 Templates', accelerate: '5 Templates + Plan' },
                    { feature: 'Strategic Bonus', starter: '-', foundations: '-', accelerate: 'FREE 1-Hr Strategy' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{row.feature}</td>
                      <td className="px-6 py-4 opacity-60">{row.starter}</td>
                      <td className="px-6 py-4">{row.foundations}</td>
                      <td className="px-6 py-4 bg-pink-900/10 font-bold text-white">{row.accelerate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-pink-50 hover:text-pink-600 transition-all shadow-lg transform hover:scale-105"
            >
              Book Mandatory Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Financial Plan Section */}
      <section id="financials" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Financial Viability</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our strategy relies on high-volume registration to fund niche systemization growth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* 6 Month Goal Card */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-2 text-center">Initial 6-Month Monthly Goal</h3>
              <p className="text-sm text-center text-slate-500 mb-8">Target: 30 Registration Clients/Month</p>
              
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Net Profit', value: 'R11,154', color: 'bg-purple-500', percent: '57%' },
                  { label: 'CIPC Fees', value: 'R5,250', color: 'bg-pink-500', percent: '27%' },
                  { label: 'Ads', value: 'R1,500', color: 'bg-slate-400', percent: '8%' },
                  { label: 'Tools/Ops', value: 'R1,596', color: 'bg-slate-500', percent: '8%' }
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className={`h-32 ${item.color} rounded-lg mb-2 flex items-end justify-center pb-2 text-white font-bold text-xs`}>
                      {item.percent}
                    </div>
                    <div className="text-xs font-semibold text-slate-600">{item.label}</div>
                    <div className="text-sm font-bold text-slate-900">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Monthly Revenue</div>
                  <div className="text-2xl font-extrabold text-green-600">R19,500</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl text-center">
                  <div className="text-xs uppercase tracking-wide text-purple-500 mb-1">Est. Net Profit</div>
                  <div className="text-2xl font-extrabold text-purple-700">R11,154</div>
                </div>
              </div>
            </div>

            {/* 3 Year Growth Card */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-2 text-center">3-Year Revenue Projection</h3>
              <p className="text-sm text-center text-slate-500 mb-8">Scaling from Funding Arm to Core Services</p>
              
              <div className="space-y-6">
                {[
                  { year: 'Year 1', registration: 130000, systemization: 50000 },
                  { year: 'Year 2', registration: 240000, systemization: 400000 },
                  { year: 'Year 3', registration: 360000, systemization: 850000 }
                ].map((data, idx) => {
                  const total = data.registration + data.systemization;
                  const regPercent = (data.registration / total) * 100;
                  const sysPercent = (data.systemization / total) * 100;
                  
                  return (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-slate-900">{data.year}</span>
                        <span className="font-bold text-slate-900">R{(total / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="flex h-12 rounded-lg overflow-hidden">
                        <div 
                          className="bg-pink-500 flex items-center justify-center text-white text-xs font-bold"
                          style={{ width: `${regPercent}%` }}
                        >
                          {regPercent > 20 && 'Registration'}
                        </div>
                        <div 
                          className="bg-purple-600 flex items-center justify-center text-white text-xs font-bold"
                          style={{ width: `${sysPercent}%` }}
                        >
                          {sysPercent > 20 && 'Systemization'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-4 bg-pink-50 rounded-xl">
                <p className="text-sm text-slate-700 italic text-center">
                  "By Year 3, recurring retainers and specialized systemization projects overtake one-off registrations as the primary revenue driver."
                </p>
              </div>

              <div className="flex gap-2 mt-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-pink-500 rounded mr-1"></div>
                  <span className="text-slate-600">Registration</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-600 rounded mr-1"></div>
                  <span className="text-slate-600">Systemization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Timeline */}
            <div>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-3">
                How It Works
              </h3>
              <p className="text-xl font-medium text-pink-600 mb-6">3 Simple Steps</p>
              <p className="mb-8 font-semibold text-slate-600">
                Time to Launch: <span className="text-purple-600">14–27 Business Days</span> from sign-up and document submission.
              </p>

              <div className="space-y-8">
                {[
                  {
                    num: 1,
                    title: 'Sign Up & Submit Docs',
                    desc: 'You sign up, and we handle the immediate paperwork, including CIPC registration.',
                    icon: <Calendar className="w-6 h-6" />
                  },
                  {
                    num: 2,
                    title: 'Design & Development',
                    desc: 'We build your digital foundation, designing your site, setting up automation (CRM, email), and creating your brand identity.',
                    icon: <Layout className="w-6 h-6" />
                  },
                  {
                    num: 3,
                    title: 'Launch & Handover',
                    desc: 'We hand over your fully structured business. You go live and start marketing with a professional system in place.',
                    icon: <Zap className="w-6 h-6" />
                  }
                ].map((step) => (
                  <div key={step.num} className="flex gap-4 group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                        {step.num}
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-purple-600">{step.icon}</div>
                        <h4 className="text-xl font-bold text-slate-900">{step.title}</h4>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial & Bonus */}
            <div>
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-3xl shadow-xl mb-8 border-t-4 border-pink-500">
                <h4 className="text-2xl font-bold text-slate-900 mb-4">What Our Clients Say</h4>
                <blockquote className="text-lg italic text-slate-700 mb-4">
                  "Pink & Purple took the headache out of the startup process. We went from just an idea to a fully registered company with a professional site in under three weeks. Absolute game-changer!"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center text-pink-700 font-bold text-xl">
                    SM
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">S. Moloi</p>
                    <p className="text-sm text-slate-600">Founder, Tech Solutions (Pty) Ltd.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900 to-pink-900 p-8 rounded-3xl text-white shadow-2xl">
                <div className="flex items-center mb-4">
                  <Award className="w-8 h-8 text-yellow-400 mr-3" />
                  <h4 className="text-2xl font-bold">✨ Exclusive Bonus</h4>
                </div>
                <h5 className="text-xl font-bold mb-3 text-yellow-400">Strategic Direction Session</h5>
                <p className="text-purple-100 leading-relaxed">
                  Every Launch Accelerate Package buyer receives a <span className="font-extrabold text-white">FREE 1-Hour Expert Consultation</span> for strategic direction. Get immediate, actionable solutions on your operations, sales, or growth strategy—exclusive to our clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-4xl font-extrabold text-center text-slate-900 mb-4">
            Launch Accelerate Package: Everything to Go Live
          </h3>
          <p className="text-center text-lg text-slate-600 mb-12 max-w-4xl mx-auto">
            We bundle the essential systems, marketing foundations, and compliance required to build a structured, automated, and scalable business.
          </p>

          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            <div className="hidden lg:grid lg:grid-cols-3 font-semibold text-sm text-slate-900 bg-purple-50 border-b border-purple-200 p-4">
              <div className="p-2">Feature</div>
              <div className="p-2">What We Deliver</div>
              <div className="p-2">Why This Matters</div>
            </div>

            <div className="divide-y divide-slate-200">
              {[
                {
                  icon: <Globe className="w-6 h-6" />,
                  feature: 'Business Registration',
                  delivery: 'CIPC registration for Private/Public Companies and foundational guidance.',
                  why: 'Essential for bank accounts and securing contracts.',
                  whyLabel: 'Compliance & Credibility'
                },
                {
                  icon: <Camera className="w-6 h-6" />,
                  feature: 'Professional Branding',
                  delivery: 'Logo Creation and Brand Identity (2 ready-made flyers included).',
                  why: 'Professional visuals that attract and retain customers.',
                  whyLabel: 'Instant Recognition'
                },
                {
                  icon: <Layout className="w-6 h-6" />,
                  feature: 'Website Development',
                  delivery: 'A professional, modern, and mobile-responsive website design and launch.',
                  why: 'Your 24/7 sales and information hub that builds trust.',
                  whyLabel: 'Digital Headquarters'
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  feature: 'Professional Domain',
                  delivery: 'We secure your unique domain name (e.g., .co.za) for one year.',
                  why: 'Essential for digital identity and search engine visibility.',
                  whyLabel: 'Brand Authority'
                },
                {
                  icon: <Mail className="w-6 h-6" />,
                  feature: 'Professional Email',
                  delivery: 'Setup of branded email addresses (e.g., info@yourcompany.co.za).',
                  why: 'Communicate with the professional excellence clients expect.',
                  whyLabel: 'Trust & Security'
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  feature: 'Social Media Opening',
                  delivery: 'Setup of core social media profiles (Facebook, Instagram, LinkedIn).',
                  why: 'Establishes your digital presence where customers are.',
                  whyLabel: 'Audience Connection'
                },
                {
                  icon: <Target className="w-6 h-6" />,
                  feature: 'Content Planning',
                  delivery: 'A 30-day content calendar and strategy to start your marketing with purpose.',
                  why: 'Launch with a clear, strategic voice.',
                  whyLabel: 'Immediate Engagement'
                },
                {
                  icon: <Mail className="w-6 h-6" />,
                  feature: 'Email Marketing Setup',
                  delivery: 'Strategy, setup, and automated management of your first email campaign.',
                  why: 'Essential tool for driving engagement and sales.',
                  whyLabel: 'Client Conversion'
                }
              ].map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-0 p-6 hover:bg-pink-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="text-purple-600 group-hover:text-pink-600 transition-colors">
                      {item.icon}
                    </div>
                    <span className="font-bold text-slate-900">{item.feature}</span>
                  </div>
                  <div className="text-slate-700 text-sm">{item.delivery}</div>
                  <div className="text-sm text-slate-600 lg:border-l-4 lg:border-purple-200 lg:pl-4">
                    <span className="font-semibold text-slate-800">{item.whyLabel}:</span> {item.why}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-10 text-center">Critical Questions Answered</h2>
          <div className="space-y-4">
            {[
              {
                question: 'How do I know the branding will fit my vision?',
                answer: 'We start with a detailed Brand Discovery Call to understand your target audience. We use a three-stage review process (Draft, Refinement, Final Approval) to ensure 100% satisfaction before proceeding.'
              },
              {
                question: 'Who owns the accounts after handover?',
                answer: 'You own everything, 100%. All domains, social accounts, and CRM logins are created under your credentials. We act as implementers, and upon handover, we relinquish administrative control.'
              },
              {
                question: 'What if CIPC rejects my name?',
                answer: 'We manage this risk by submitting multiple name options. If rejected, we immediately advise on next steps. While CIPC processes, we continue working on your branding and digital setup so time isn\'t lost.'
              },
              {
                question: 'What happens after the 27 days?',
                answer: 'You receive complete access to all systems, detailed documentation, and training materials. We also offer optional monthly retainer packages for ongoing support, content creation, and system optimization.'
              }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-slate-50 rounded-xl border border-slate-200 hover:border-pink-300 transition-all">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-slate-800 group-open:text-pink-600">
                  {faq.question}
                  <span className="ml-4 flex-shrink-0 text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-6 text-slate-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h3 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Stop Struggling. Start Scaling.
          </h3>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            Choose a partner committed to your success. Book a mandatory consultation to ensure we're the perfect fit for your business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-purple-900 rounded-full text-lg font-bold hover:bg-yellow-400 hover:text-slate-900 transition-all shadow-2xl transform hover:scale-105"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Strategy Call Now
            </button>
            <a
              href="mailto:info@pinkandpurple.co.za?subject=Inquiry about Launch Accelerate Package"
              className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-bold hover:bg-white hover:text-purple-900 transition-all"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us Instead
            </a>
          </div>
          <p className="text-purple-300 text-sm mt-6">No obligation. 100% Free consultation.</p>
        </div>
      </section>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl transform scale-100 animate-in zoom-in">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-3xl font-bold leading-none"
            >
              ×
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Book Strategy Call</h3>
              <p className="text-slate-600 text-sm mb-8">
                Mandatory for Launch Accelerate clients. Let's ensure we're a perfect fit for your business goals.
              </p>
              
              <div className="space-y-3">
                <a 
                  href="#"
                  className="block w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                  Select Time on Calendly
                </a>
                <a 
                  href="mailto:info@pinkandpurple.co.za"
                  className="block w-full bg-white border-2 border-slate-300 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                >
                  Email Us Instead
                </a>
              </div>
              <p className="text-xs text-slate-400 mt-4">No obligation. 100% Free.</p>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};
