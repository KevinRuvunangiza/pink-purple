export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-pink-500 via-purple-500 to-purple-600">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Heading */}
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Ready to Build Your Business the Smart Way?
          </h2>

          {/* Subtext */}
          <p className="text-lg text-purple-100 mb-10">
            Get your company up and running in days, not weeks.
          </p>

          {/* CTA Button */}
          <a
            href="#register"
            className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-10 py-5 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all duration-200 shadow-2xl hover:scale-105"
          >
            Start Registration
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
