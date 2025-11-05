import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ressphoto from '../Assets/restaurant_photo2.jpg';
import { FiZap, FiHeart, FiShield, FiTrendingUp } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

const About = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: FiZap,
      title: "Farm-to-Table Freshness",
      description: "We source the finest ingredients directly from local farms, ensuring every dish is prepared with the freshest produce.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: FiHeart,
      title: "Signature Culinary Creations",
      description: "Our award-winning chefs craft unique dishes that blend traditional techniques with modern innovation.",
      color: "from-pink-400 to-red-500"
    },
    {
      icon: FiShield,
      title: "Premium Service Standards",
      description: "Experience exceptional hospitality with our professionally trained staff dedicated to making your visit memorable.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: FiTrendingUp,
      title: "Elegant Dining Atmosphere",
      description: "Enjoy your meal in our beautifully designed space that combines comfort with sophistication.",
      color: "from-blue-400 to-indigo-500"
    }
  ];

  const stats = [
    { icon: FiZap, value: "100%", label: "Fresh Ingredients", color: "text-yellow-400" },
    { icon: FiHeart, value: "4.9", label: "Customer Rating", color: "text-pink-400" },
    { icon: FiShield, value: "15+", label: "Years Experience", color: "text-green-400" },
    { icon: FiTrendingUp, value: "50+", label: "Signature Dishes", color: "text-blue-400" }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 glass-card text-sm font-medium text-gray-700 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <HiSparkles className="text-orange-500" />
Authentic Indian Heritage
          </motion.div>
          
          <motion.h1 
            className="text-primary-heading mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Where Tradition Meets
            <span className="text-neon block">Innovation</span>
          </motion.h1>
          
          <motion.p 
            className="text-primary-text max-w-3xl mx-auto text-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            We're not just a restaurant. We're a cultural journey where authentic Indian traditions 
            meet modern dining, creating memorable experiences with traditional spices and warm hospitality.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Interactive Image Section */}
          <motion.div 
            className="order-2 lg:order-1 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-3xl">
                <div className="neon-border">
                  <img 
                    src={ressphoto} 
                    alt="Restaurant Experience" 
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                </div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />
                
                {/* Floating Stats Cards */}
                <motion.div 
                  className="absolute top-6 left-6 morphism-card p-4 w-32"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">Chef</div>
                    <div className="text-xs text-white/70">Special</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-6 right-6 morphism-card p-4 w-36"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-white mb-1">Premium</div>
                    <div className="text-xs text-white/70">Quality</div>
                  </div>
                </motion.div>
              </div>
              
              {/* Decorative Elements */}
              <motion.div 
                className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 opacity-60 blur-xl"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-60 blur-xl"
                animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            className="order-1 lg:order-2 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className={`card-hover morphism-card p-6 cursor-pointer transition-all duration-300 ${
                      activeFeature === index ? 'ring-2 ring-white/30' : ''
                    }`}
                    onClick={() => setActiveFeature(index)}
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                        <Icon className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-800 font-bold text-lg mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                    
                    {activeFeature === index && (
                      <motion.div
                        className="mt-4 pt-4 border-t border-white/10"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-gray-600 text-sm">
                          Experience the difference with our innovative approach to food discovery.
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="text-center morphism-card p-6 card-hover"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-3">
                  <Icon className={`text-3xl ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="btn-futuristic text-lg px-12 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reserve Your Table Today
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;