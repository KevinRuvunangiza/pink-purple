import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import MainLogo from "../assets/Pink & Purple Logo Package/Main logo without background.png";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

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
            <Link to="/">
              <img src={MainLogo} alt="Pink and Purple Main Logo" className="w-45"/>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            <Link
              to="/"
              className={`text-sm font-bold transition-colors duration-200 ${
                scrolled
                  ? "text-gray-900 hover:text-pink-500"
                  : "text-white hover:text-pink-200"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-bold transition-colors duration-200 ${
                scrolled
                  ? "text-gray-900 hover:text-pink-500"
                  : "text-white hover:text-pink-200"
              }`}
            >
              About
            </Link>

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
                  <Link
                    to="/services"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  >
                    <div className="font-bold">All Services</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      View our full range
                    </div>
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  >
                    <div className="font-bold">Business Registration</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Get started today
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/blog"
              className={`text-sm font-bold transition-colors duration-200 ${
                scrolled
                  ? "text-gray-900 hover:text-pink-500"
                  : "text-white hover:text-pink-200"
              }`}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-bold transition-colors duration-200 ${
                scrolled
                  ? "text-gray-900 hover:text-pink-500"
                  : "text-white hover:text-pink-200"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/next-steps"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${
                scrolled
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : "border-2 border-pink-400 text-zinc-50 hover:bg-pink-600"
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
            </Link>
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
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-white shadow-xl border-t border-gray-100">
            <div className="px-4 py-6 space-y-1">
              <button
                onClick={() => handleNavClick("/")}
                className="block w-full text-left px-4 py-3 text-base font-bold text-gray-900 rounded-xl transition-all hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600 active:scale-95"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick("/about")}
                className="block w-full text-left px-4 py-3 text-base font-bold text-gray-900 rounded-xl transition-all hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600 active:scale-95"
              >
                About
              </button>
              
              {/* Services section in mobile */}
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Services
                </div>
                <button
                  onClick={() => handleNavClick("/services")}
                  className="block w-full text-left px-4 py-3 ml-2 text-sm font-semibold text-gray-700 rounded-xl transition-all hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600 active:scale-95"
                >
                  All Services
                </button>
                <button
                  onClick={() => handleNavClick("/register")}
                  className="block w-full text-left px-4 py-3 ml-2 text-sm font-semibold text-gray-700 rounded-xl transition-all hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600 active:scale-95"
                >
                  Register Your Business
                </button>
              </div>

              <button
                onClick={() => handleNavClick("/blog")}
                className="block w-full text-left px-4 py-3 text-base font-bold text-gray-900 rounded-xl transition-all hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600 active:scale-95"
              >
                Blog
              </button>
              <button
                onClick={() => handleNavClick("/contact")}
                className="block w-full text-left px-4 py-3 text-base font-bold text-gray-900 rounded-xl transition-all hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600 active:scale-95"
              >
                Contact
              </button>

              {/* CTA Button */}
              <div className="pt-4 px-4">
                <button
                  onClick={() => handleNavClick("/get-started")}
                  className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-4 rounded-2xl text-base font-bold shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-purple-600 transition-all active:scale-95"
                >
                  Get Started
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
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}