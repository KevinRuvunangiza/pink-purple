export default function HeroSection() {
  return (
    <section id="home" className="bg-stone-900 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-black text-zinc-50 leading-tight mb-6">
            Empowering Small Businesses to{" "}
            <span className="text-transparent bg-clip-text bg-pink-500">
              Grow Smarter
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg lg:text-xl text-zinc-50 mb-10 leading-relaxed max-w-3xl mx-auto">
            Pink & Purple helps entrepreneurs simplify business registration,
            automate operations, and unlock the tools they need to scale. Your
            business deserves a system that works as hard as you do.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pink-500 text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Register Your Business
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
            <a
              href="#about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-lg text-base font-semibold  hover:bg-purple-500 transition-all duration-200 border-none hover:text-white  transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
