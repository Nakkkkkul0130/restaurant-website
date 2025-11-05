import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../Assets/logo.png';

const LoadingScreen = () => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-orange-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-300 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-red-300 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <motion.div 
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          <div className="relative">
            <img src={Logo} alt="Indian Lounge" className="h-20 w-auto mx-auto" />
            <motion.div 
              className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-30 blur-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1 
          className="text-4xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Indian Lounge
        </motion.h1>

        {/* Tagline */}
        <motion.p 
          className="text-orange-600 text-lg mb-8 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          🌶️ Authentic • 🍛 Spices • 🏛️ Heritage
        </motion.p>

        {/* Loading Animation */}
        <motion.div 
          className="flex justify-center space-x-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Loading Text */}
        <motion.p 
          className="text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Preparing your authentic Indian experience...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;