import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from "../assets/Pink & Purple Logo Package/Icon without background.png";

const LogoLoadingScreen = ({ children, duration = 3500 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading-screen"
            className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden"
          >
            {/* Gradient Background Reveal */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5],
                opacity: [0, 0.1, 0.15]
              }}
              transition={{ 
                duration: 2,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              className="absolute inset-0"
            >
              <div className="w-full h-full bg-gradient-to-br from-pink-100 via-purple-50 to-purple-100" />
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ 
                scale: [0.5, 1.1, 1],
                opacity: [0, 1, 1],
                rotate: [-10, 2, 0]
              }}
              transition={{ 
                duration: 1.8,
                times: [0, 0.6, 1],
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="relative z-10 w-48 h-48"
            >
              <motion.img 
                src={Icon} 
                alt="Logo" 
                className="w-full h-full object-contain drop-shadow-2xl"
                animate={{
                  filter: [
                    "drop-shadow(0 10px 20px rgba(233, 30, 140, 0.3))",
                    "drop-shadow(0 15px 30px rgba(123, 58, 150, 0.4))",
                    "drop-shadow(0 10px 20px rgba(233, 30, 140, 0.3))"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Elegant Expanding Overlay */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 150]
              }}
              transition={{ 
                duration: 1,
                delay: 2.3,
                ease: [0.76, 0, 0.24, 1]
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-purple-600" />
            </motion.div>

            {/* Fade Out Everything */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.3,
                delay: 3.1
              }}
              className="absolute inset-0 bg-white"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isLoading ? 0 : 1,
          y: isLoading ? 20 : 0
        }}
        transition={{ 
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default LogoLoadingScreen;