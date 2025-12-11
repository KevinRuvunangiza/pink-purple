import { useState } from "react";
import { Link, useNavigate } from "react-router";
import MainLogo from "../assets/Pink & Purple Logo Package/Main logo without background.png";

export default function NavBarSolid() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center z-10">
            <img src={MainLogo} alt="Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">

            <Link
              to="/"
              className="font-semibold text-gray-700 hover:text-pink-600 transition-all duration-200"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="font-semibold text-gray-700 hover:text-pink-600 transition-all duration-200"
            >
              About
            </Link>

            {/* SERVICES DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="font-semibold text-gray-700 hover:text-pink-600 transition-all duration-200 flex items-center gap-2"
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {servicesOpen && (
                <div className="absolute mt-3 bg-white shadow-xl rounded-xl py-3 px-2 w-56 border border-gray-100">
                  <Link
                    to="/next-steps"
                    className="block px-4 py-2 rounded-lg font-semibold text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition"
                  >
                    Business Registration
                  </Link>

                  <Link
                    to="/fullstack-launch"
                    className="flex justify-between items-center px-4 py-2 rounded-lg font-semibold text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition"
                  >
                    Fullstack Launch
                    <span className="text-xs font-bold bg-pink-600 text-white px-2 py-0.5 rounded-md">
                      NEW
                    </span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/blog"
              className="font-semibold text-gray-700 hover:text-pink-600 transition-all duration-200"
            >
              Blog
            </Link>

            <Link
              to="/contact"
              className="font-semibold text-gray-700 hover:text-pink-600 transition-all duration-200"
            >
              Contact
            </Link>
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:block">
            <Link
              to="/next-steps"
              className="px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 bg-pink-600 text-white hover:bg-purple-600"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden focus:outline-none text-gray-700 z-10"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-xl">
          <div className="px-4 py-6 space-y-2 max-w-7xl mx-auto">

            <button onClick={() => handleNavClick("/")} className="mobile-nav-btn">Home</button>
            <button onClick={() => handleNavClick("/about")} className="mobile-nav-btn">About</button>

            {/* MOBILE DROPDOWN (SERVICES) */}
            <details className="bg-gray-50 rounded-xl">
              <summary className="px-4 py-3 text-base font-bold text-gray-900 cursor-pointer">
                Services
              </summary>

              <div className="px-2 py-2 space-y-2">

                <button
                  onClick={() => handleNavClick("/next-steps")}
                  className="mobile-sub-btn"
                >
                  Business Registration
                </button>

                <button
                  onClick={() => handleNavClick("/fullstack-launch")}
                  className="mobile-sub-btn flex justify-between items-center"
                >
                  Fullstack Launch
                  <span className="text-xs font-bold bg-pink-600 text-white px-2 py-0.5 rounded-md">
                    NEW
                  </span>
                </button>

              </div>
            </details>

            <button onClick={() => handleNavClick("/blog")} className="mobile-nav-btn">
              Blog
            </button>

            <button onClick={() => handleNavClick("/contact")} className="mobile-nav-btn">
              Contact
            </button>

            {/* CTA Mobile */}
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

/* Helper classes (optional) */
const mobileNavBtn = `
  block w-full text-left px-4 py-3 text-base font-bold text-gray-900 rounded-xl
  transition-all hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600 active:scale-95
`;

const mobileSubBtn = `
  block w-full text-left px-4 py-3 text-base font-semibold text-gray-700 rounded-lg
  hover:bg-pink-50 hover:text-pink-600 transition
`;
