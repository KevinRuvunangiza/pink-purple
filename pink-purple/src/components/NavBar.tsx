import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import MainLogo from "../assets/Pink & Purple Logo Package/Main logo without background.png";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center z-10">
            <img src={MainLogo} alt="Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-semibold transition-all duration-200 ${
                scrolled
                  ? "text-gray-700 hover:text-pink-600"
                  : "text-white hover:text-pink-200"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`font-semibold transition-all duration-200 ${
                scrolled
                  ? "text-gray-700 hover:text-pink-600"
                  : "text-white hover:text-pink-200"
              }`}
            >
              About
            </Link>
            <Link
              to="/next-steps"
              className={`font-semibold transition-all duration-200 ${
                scrolled
                  ? "text-gray-700 hover:text-pink-600"
                  : "text-white hover:text-pink-200"
              }`}
            >
              Business Registration
            </Link>
            <Link
              to="/blog"
              className={`font-semibold transition-all duration-200 ${
                scrolled
                  ? "text-gray-700 hover:text-pink-600"
                  : "text-white hover:text-pink-200"
              }`}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className={`font-semibold transition-all duration-200 ${
                scrolled
                  ? "text-gray-700 hover:text-pink-600"
                  : "text-white hover:text-pink-200"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <Link
              to="/next-steps"
              className={`px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 bg-pink-600 text-white hover:bg-brand-purple-600 duration-75`}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden focus:outline-none transition-colors z-10 ${
              scrolled ? "text-gray-700" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24" 
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
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
        <div className="md:hidden bg-white border-t border-gray-200 shadow-xl animate-fade-in">
          <div className="px-4 py-6 space-y-2 max-w-7xl mx-auto">
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
            <button
              onClick={() => handleNavClick("/next-steps")}
              className="block w-full text-left px-4 py-3 text-base font-bold text-gray-900 rounded-xl transition-all hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600 active:scale-95"
            >
              Business Registration
            </button>
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

            {/* CTA Button Mobile */}
            <div className="pt-4">
              <button
                onClick={() => handleNavClick("/next-steps")}
                className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-4 rounded-2xl text-base font-bold shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-purple-600 transition-all active:scale-95"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}