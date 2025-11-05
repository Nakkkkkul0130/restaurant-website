import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../Assets/logo.png';
import { BsTwitter, BsInstagram, BsYoutube } from 'react-icons/bs';
import { SiLinkedin } from 'react-icons/si';

const Footer = () => {
  const socialLinks = [
    { icon: BsTwitter, href: "https://x.com/Nakulbhar001", label: "Twitter" },
    { icon: SiLinkedin, href: "https://www.linkedin.com/in/nakul-bhar0130/", label: "LinkedIn" },
    { icon: BsInstagram, href: "https://www.instagram.com/nakul_bhar0130/", label: "Instagram" },
    { icon: BsYoutube, href: "#", label: "YouTube" },
  ];

  const contactInfo = [
    "Contact Us: 244-53333-7783",
    "Email: hello@food.com",
    "Press: press@food.com",
    "General: contact@food.com"
  ];

  const legalLinks = [
    "Terms and Conditions",
    "Privacy Policy"
  ];

  return (
    <motion.footer 
      className="bg-gradient-to-r from-secondary to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and Social Links */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center">
              <img src={Logo} alt="Logo" className="h-16 w-auto" />
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-primary transition-colors duration-300"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <IconComponent className="text-2xl" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-primary mb-4">Contact Info</h3>
            {contactInfo.map((info, index) => (
              <motion.p
                key={index}
                className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {info}
              </motion.p>
            ))}
          </motion.div>

          {/* Legal Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-primary mb-4">Legal</h3>
            {legalLinks.map((link, index) => (
              <motion.p
                key={index}
                className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {link}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="border-t border-gray-600 mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400">
            © 2024 Restaurant Website. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;