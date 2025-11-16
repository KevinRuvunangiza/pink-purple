import { Link } from "react-router";
import { motion } from "framer-motion";
import NavBarSolid from "./AltNavBar";

export default function WorkInProgress({ pageName }: { pageName: string }) {
  return (
    <>
    <NavBarSolid />
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center px-4 pt-20">
      <div className="max-w-2xl w-full text-center">
        {/* Cute Floating Paint Palette */}
        <motion.div
          className="relative w-48 h-48 mx-auto mb-8"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Main Palette */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-500 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] shadow-2xl">
            {/* Paint Blobs */}
            <motion.div
              className="absolute top-8 left-8 w-12 h-12 bg-pink-400 rounded-full shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="absolute top-8 right-8 w-12 h-12 bg-yellow-400 rounded-full shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div
              className="absolute bottom-12 left-12 w-12 h-12 bg-blue-400 rounded-full shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
            <motion.div
              className="absolute bottom-12 right-12 w-12 h-12 bg-green-400 rounded-full shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
            />
            
            {/* Cute Face on Palette */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* Eyes */}
              <div className="flex gap-4 justify-center mb-2">
                <motion.div
                  className="w-3 h-3 bg-white rounded-full shadow-inner"
                  animate={{ scaleY: [1, 0.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                >
                  <div className="w-1.5 h-1.5 bg-gray-800 rounded-full ml-1 mt-0.5" />
                </motion.div>
                <motion.div
                  className="w-3 h-3 bg-white rounded-full shadow-inner"
                  animate={{ scaleY: [1, 0.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                >
                  <div className="w-1.5 h-1.5 bg-gray-800 rounded-full ml-1 mt-0.5" />
                </motion.div>
              </div>
              
              {/* Happy Smile */}
              <div className="w-6 h-3 border-b-2 border-white rounded-b-full" />
            </div>
          </div>

          {/* Floating Paintbrush */}
          <motion.div
            className="absolute -right-4 top-1/2 w-16 h-4"
            animate={{
              rotate: [0, 10, -10, 0],
              x: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-10 h-4 bg-yellow-600 rounded-r-full" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-6 bg-gray-700 rounded-lg">
              <div className="absolute right-0 w-3 h-6 bg-pink-400 rounded-r-lg" />
            </div>
          </motion.div>
        </motion.div>

        {/* Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 20}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Animated Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Coming Soon!
        </motion.h1>

        {/* Page Name */}
        <motion.p
          className="text-2xl font-bold text-gray-700 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {pageName} Page
        </motion.p>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-pink-500 rounded-full"
              animate={{
                y: [-10, 0, -10],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Message */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-200 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-lg text-gray-600 mb-4">
            We're working hard to bring you something amazing! 🎨✨
          </p>
          <p className="text-sm text-gray-500">
            This page is under construction and will be ready soon.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-8">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "75%" }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <motion.div
            className="absolute left-0 top-0 h-full w-20 bg-white/40"
            animate={{
              x: [-80, 400],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Back to Home Button */}
        <Link to="/">
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </motion.button>
        </Link>
      </div>
    </div>
    </>
  );
}