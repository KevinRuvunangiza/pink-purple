import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function MascotPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const defaultTimer = 22000; // 22 seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, defaultTimer); // 22 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleYesRegister = () => {
    setStep(3);
  };

  const handleRegisterNextSteps = () => {
    navigate("/next-steps");
  };

  const handleNoRegister = () => {
    setStep(2);
  };

  const handleLearnMore = () => {
    navigate("/about");
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-slideUp">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Mascot Header with Gradient */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
          </div>

          {/* Cute Mascot Character */}
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <span className="text-6xl animate-wave">👋</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">
            Hi there, friend!
          </h3>
        </div>

        {/* Content */}
        <div className="p-8">
          {step === 1 && (
            <>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
                I noticed you've been exploring! Ready to take the exciting step
                and
                <span className="font-semibold text-purple-600">
                  {" "}
                  register your business
                </span>
                ?
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleYesRegister}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Yes, Let's Do This!
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNoRegister}
                  className="w-full py-4 px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
                >
                  Not quite yet...
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
                That's totally okay! Would you like to
                <span className="font-semibold text-purple-600">
                  {" "}
                  learn more about Pink and Purple
                </span>{" "}
                and how we make business registration super simple?
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleLearnMore}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Tell Me More! 💡
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={handleClose}
                  className="w-full py-4 px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
                >
                  Maybe Later
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
                You are on the path to success!
                <span className="font-semibold text-purple-600">
                  {" "}
                  And are about to register your business
                </span>{" "}
                with Pink and Purple. Let's get started!
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleRegisterNextSteps}
                  className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Let's Go!
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={handleClose}
                  className="w-full py-4 px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
                >
                  Maybe Later
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(20deg);
          }
          75% {
            transform: rotate(-20deg);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        .animate-wave {
          display: inline-block;
          animation: wave 1s ease-in-out infinite;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
