import { useState, useEffect } from "react";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1
              className={`text-xl font-black tracking-tight transition-colors duration-300 ${
                scrolled ? "text-purple-600" : "text-white drop-shadow-md"
              }`}
            >
              PINK AND PURPLE
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            <a
              href="#home"
              className={`text-sm font-bold transition-colors duration-200 ${
                scrolled
                  ? "text-gray-900 hover:text-pink-500"
                  : "text-white hover:text-pink-200"
              }`}
            >
              Home
            </a>
            <a
              href="#about"
              className={`text-sm font-bold transition-colors duration-200 ${
                scrolled
                  ? "text-gray-900 hover:text-pink-500"
                  : "text-white hover:text-pink-200"
              }`}
            >
              About
            </a>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`text-sm font-bold transition-colors duration-200 flex items-center gap-1 ${
                  scrolled
                    ? "text-gray-900 hover:text-pink-500"
                    : "text-white hover:text-pink-200"
                }`}
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <a
                    href="#services"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  >
                    <div className="font-bold">All Services</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      View our full range
                    </div>
                  </a>
                  <a
                    href="#register"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  >
                    <div className="font-bold">Register Your Business</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Get started today
                    </div>
                  </a>
                </div>
              )}
            </div>

            <a
              href="#blog"
              className={`text-sm font-bold transition-colors duration-200 ${
                scrolled
                  ? "text-gray-900 hover:text-pink-500"
                  : "text-white hover:text-pink-200"
              }`}
            >
              Blog
            </a>
            <a
              href="#contact"
              className={`text-sm font-bold transition-colors duration-200 ${
                scrolled
                  ? "text-gray-900 hover:text-pink-500"
                  : "text-white hover:text-pink-200"
              }`}
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#get-started"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${
                scrolled
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : "border-2 border-brand-pink-400 text-zinc-50  "
              }`}
            >
              Get Started
              <svg
                className="w-4 h-4"
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

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`focus:outline-none ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="space-y-1">
              {["home", "about", "services", "register", "blog", "contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-sm font-bold rounded-lg transition-colors hover:bg-pink-50 hover:text-pink-600 ${
                      item === "register" ? "ml-4 text-gray-700" : "text-gray-900"
                    }`}
                  >
                    {item === "register" ? "→ Register Your Business" : item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                )
              )}
              <div className="pt-4">
                <a
                  href="#get-started"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-pink-500 text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-pink-600 transition-colors mx-4"
                >
                  Get Started
                  <svg
                    className="w-4 h-4"
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
          </div>
        )}
      </div>
    </nav>
  );
}
