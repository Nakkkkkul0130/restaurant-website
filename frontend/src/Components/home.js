import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import resphoto from '../Assets/restaurant_photo.jpg';
import { FiArrowRight, FiStar, FiMapPin, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { icon: FiStar, value: '4.9', label: 'Customer Rating' },
    { icon: FiUsers, value: '10K+', label: 'Happy Customers' },
    { icon: FiTrendingUp, value: '15+', label: 'Years Experience' },
    { icon: FiMapPin, value: '3', label: 'Locations' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Interactive Background Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(102, 126, 234, 0.1), transparent 40%)`
        }}
      />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Section */}
            <motion.div 
              className="text-center lg:text-left space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 glass-card text-sm font-medium text-gray-700"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <HiSparkles className="text-orange-500" />
                Restaurant + Discovery Platform
              </motion.div>

              <motion.h1 
                className="text-primary-heading max-w-3xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Taste the
                <span className="text-neon block">Authentic</span>
                Indian Flavors
              </motion.h1>
              
              <motion.p 
                className="text-primary-text max-w-xl text-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Experience authentic Indian cuisine at our lounge, plus discover the best nearby restaurants 
                based on your location, cuisine preferences, and budget.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 items-center lg:items-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link to="/menu">
                  <motion.button 
                    className="btn-futuristic flex items-center gap-3 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                  >
                    <span>Visit Our Restaurant</span>
                    <motion.div
                      animate={{ x: isHovered ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiArrowRight className="text-xl" />
                    </motion.div>
                  </motion.button>
                </Link>
                
                <Link to="/restaurants">
                  <motion.button 
                    className="btn-glow flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiMapPin className="text-sm" />
                    Find Nearby Restaurants
                  </motion.button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-center mb-2">
                      <stat.icon className="text-2xl text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image Section */}
            <motion.div 
              className="flex justify-center lg:justify-center items-start relative -mt-16"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div 
                className="relative floating-element"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Main Image Container */}
                <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
                  {/* Neon Border Effect */}
                  <div className="absolute inset-0 neon-border pulse-glow" />
                  
                  {/* Image */}
                  <div className="absolute inset-4 rounded-2xl overflow-hidden">
                    <img 
                      src={resphoto} 
                      alt="Restaurant" 
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                  
                  {/* Floating Cards */}
                  <motion.div 
                    className="absolute -top-6 -left-6 morphism-card p-4 w-32"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">5★</div>
                      <div className="text-xs text-gray-600">Chef Rating</div>
                      <div className="flex justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className="text-yellow-400 text-xs fill-current" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -bottom-6 -right-6 morphism-card p-4 w-36"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-800">Fresh</div>
                      <div className="text-xs text-gray-600">Daily</div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Decorative Orbiting Elements */}
                <motion.div 
                  className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 opacity-60"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute -bottom-8 -left-8 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-60"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute top-1/2 -right-12 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 opacity-60"
                  animate={{ rotate: 360, y: [-20, 20, -20] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;