import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from "../assets/Pink & Purple Logo Package/Icon without background.png"

const LogoLoadingScreen = ({ children, logoUrl, duration = 3500 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage transitions
    const stage1 = setTimeout(() => setStage(1), 800);
    const stage2 = setTimeout(() => setStage(2), 1800);
    const stage3 = setTimeout(() => setStage(3), 2600);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900 overflow-hidden"
          >
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
              }}>
                <motion.div
                  animate={{
                    backgroundPosition: ['0px 0px', '60px 60px'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="w-full h-full"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(236, 72, 153, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(236, 72, 153, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                  }}
                />
              </div>
            </div>

            {/* Radial Glow Effects */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.3, 0.3, 0],
                scale: [0.8, 1.2, 1.4, 1.6]
              }}
              transition={{ 
                duration: 3,
                times: [0, 0.3, 0.7, 1],
                ease: "easeOut"
              }}
              className="absolute w-[600px] h-[600px] rounded-full bg-purple-600 blur-[120px]"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.2, 0.2, 0],
                scale: [0.8, 1.3, 1.5, 1.7]
              }}
              transition={{ 
                duration: 3,
                delay: 0.2,
                times: [0, 0.3, 0.7, 1],
                ease: "easeOut"
              }}
              className="absolute w-[700px] h-[700px] rounded-full bg-pink-600 blur-[130px]"
            />

            {/* Main Logo Container */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Logo with sophisticated animations */}
              <motion.div
                initial={{ scale: 0, opacity: 0, rotateY: -180 }}
                animate={{ 
                  scale: stage >= 1 ? 1 : 0,
                  opacity: stage >= 1 ? 1 : 0,
                  rotateY: stage >= 1 ? 0 : -180,
                }}
                transition={{ 
                  duration: 1,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                className="relative mb-8"
              >
                {/* Logo glow ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full bg-purple-500 blur-2xl"
                />
                
                {/* Logo */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <motion.img 
                    src={Icon || "/api/placeholder/128/128"}
                    alt="Logo" 
                    className="w-full h-full object-contain"
                    animate={{
                      filter: [
                        "brightness(1) drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))",
                        "brightness(1.2) drop-shadow(0 0 30px rgba(236, 72, 153, 0.8))",
                        "brightness(1) drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>

              {/* Company Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: stage >= 1 ? 1 : 0,
                  y: stage >= 1 ? 0 : 20
                }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="text-center mb-6"
              >
                <h1 className="text-4xl font-bold text-white mb-2">
                  Pink & Purple
                </h1>
                <p className="text-neutral-400 text-sm tracking-wider uppercase">
                  Business Solutions
                </p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ 
                  opacity: stage >= 2 ? 1 : 0,
                  width: stage >= 2 ? '200px' : 0
                }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="h-1 bg-neutral-800 rounded-full overflow-hidden"
              >
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: stage >= 2 ? '100%' : '0%' }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </motion.div>
            </div>

            {/* Particles Effect */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: '50vw',
                  y: '50vh',
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: 1.5 + Math.random() * 0.5,
                  ease: "easeOut"
                }}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: i % 2 === 0 ? '#a855f7' : '#ec4899'
                }}
              />
            ))}

            {/* Final Wipe Transition */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ 
                scaleY: stage >= 3 ? 1 : 0
              }}
              transition={{ 
                duration: 0.6,
                ease: [0.76, 0, 0.24, 1]
              }}
              style={{ originY: 0 }}
              className="absolute inset-0 bg-white"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isLoading ? 0 : 1
        }}
        transition={{ 
          duration: 0.8,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default LogoLoadingScreen;