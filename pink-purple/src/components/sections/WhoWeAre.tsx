

export default function WhoWeAre(){

     return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Heading */}
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">
            Who We Are
          </h2>
          
          {/* Body Text */}
          <p className="text-lg text-gray-600 leading-relaxed mb-16">
            Pink & Purple is a South African-based business solutions company helping small and medium enterprises (SMEs) establish strong foundations. From company registration and system automation to CRM setup and digital marketing, we empower businesses with structure, technology, and strategic guidance.
          </p>
          
          {/* Vision & Mission Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Vision Card */}
            <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To create a future where entrepreneurs run efficient, automated, and sustainable businesses.
              </p>
            </div>
            
            {/* Mission Card */}
            <div className="bg-pink-50 rounded-2xl p-8 border border-pink-100">
              <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To simplify business growth through technology, automation, and personalized support.
              </p>
            </div>
          </div>
          
          {/* Core Values */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Core Values</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Integrity and Transparency',
                'Professionalism',
                'Simplicity and Innovation',
                'Empowerment through Knowledge'
              ].map((value, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}