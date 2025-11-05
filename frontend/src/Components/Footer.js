import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '../Assets/logo.png';
import { BsTwitter, BsInstagram, BsYoutube, BsArrowUp } from 'react-icons/bs';
import { SiLinkedin } from 'react-icons/si';
import { FiMail, FiPhone, FiMapPin, FiHeart, FiSend } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

const Footer = () => {
  // Daily specials that rotate based on date
  const dailySpecials = [
    "20% off on Biryani",
    "25% off on Butter Chicken",
    "30% off on Tandoori Platter",
    "15% off on Dal Makhani",
    "20% off on Paneer Tikka",
    "25% off on Chicken Curry",
    "30% off on Naan Combo"
  ];

  // Get today's special based on current date
  const getTodaysSpecial = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return dailySpecials[dayOfYear % dailySpecials.length];
  };

  const socialLinks = [
    { icon: BsTwitter, href: "https://x.com/Nakulbhar001", label: "Twitter", color: "hover:text-blue-400" },
    { icon: SiLinkedin, href: "https://www.linkedin.com/in/nakul-bhar0130/", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: BsInstagram, href: "https://www.instagram.com/nakul_bhar0130/", label: "Instagram", color: "hover:text-pink-400" },
  ];

  const quickLinks = [
    { name: "🍽️ Order Now", href: "/menu" },
    { name: "🏪 Find Restaurants", href: "/restaurants" },
    { name: "📞 Contact Us", href: "/contact" },
    { name: "⭐ Reviews", href: "/testimonials" },
  ];

  const specialOffers = [
    { name: "🎉 Today's Special", desc: getTodaysSpecial() },
    { name: "🔥 Weekend Deal", desc: "Buy 2 Get 1 Free Dessert" },
    { name: "💝 First Order", desc: "Get 15% discount" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer 
      className="relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background with gradient and effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Brand Section */}
            <motion.div 
              className="space-y-6 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="relative">
                  <img src={Logo} alt="Logo" className="h-14 w-auto" />
                  <motion.div 
                    className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-30 blur-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <div className="text-white font-bold text-2xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Indian Lounge</div>
                  <div className="text-orange-300 text-sm font-medium">🌶️ Authentic • 🍛 Spices • 🏛️ Heritage</div>
                </div>
              </div>
              
              <p className="text-white/80 text-sm leading-relaxed">
                🍽️ Savor the taste of India with our authentic recipes, aromatic spices, 
                and royal hospitality. Every bite tells a story! ✨
              </p>
              
              <div>
                <p className="text-orange-300 font-semibold mb-3">📱 Follow Us for Daily Specials!</p>
                <div className="flex space-x-3 justify-center md:justify-start">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 text-white ${social.color} transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-500/40 hover:to-red-500/40 border border-orange-500/30`}
                        whileHover={{ scale: 1.15, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <IconComponent className="text-xl" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              className="space-y-4 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center justify-center md:justify-start gap-2">
                <HiSparkles className="text-orange-400" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    className="block text-white/80 hover:text-orange-300 transition-all duration-300 hover:translate-x-2 py-2 px-3 rounded-lg hover:bg-white/5 border-l-2 border-transparent hover:border-orange-400"
                    whileHover={{ x: 5, scale: 1.02 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Special Offers */}
            <motion.div 
              className="space-y-4 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center justify-center md:justify-start gap-2">
                <FiHeart className="text-red-400" />
                Special Offers
              </h3>
              <div className="space-y-3">
                {specialOffers.map((offer, index) => (
                  <motion.div
                    key={index}
                    className="p-3 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-orange-300 font-medium text-sm">{offer.name}</div>
                    <div className="text-white/70 text-xs">{offer.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div 
            className="border-t border-white/10 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 text-white/60 text-sm text-center">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <p className="whitespace-nowrap flex items-center gap-2">
                  <FiHeart className="text-red-400" />
                  © 2024 Indian Lounge. All rights reserved.
                </p>
                <p className="whitespace-nowrap flex items-center gap-1">
                  Made with ❤️ by Nakul
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="hover:text-orange-300 transition-colors duration-300 whitespace-nowrap">Privacy Policy</button>
                <button className="hover:text-orange-300 transition-colors duration-300 whitespace-nowrap">Terms of Service</button>
                <button className="hover:text-orange-300 transition-colors duration-300 whitespace-nowrap">Cookie Policy</button>
              </div>
            </div>
            
            <motion.button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex-shrink-0 border border-orange-400/30"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <BsArrowUp className="text-lg" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;