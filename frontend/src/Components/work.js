import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuImage from "../Assets/pick-meals-image.png";
import { FiPlus, FiMinus } from 'react-icons/fi';

const Work = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuChartUrl = "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/food-menu-for-cafeteria%2C-restaurant-%26-canteen-design-template-d565ba9d91e1c5c38ddfa9ccd3d37455_screen.jpg?ts=1697230971";

    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white/50 to-brown-100/30">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                        How It Works
                    </h1>
                    <p className="text-lg md:text-xl text-accent max-w-4xl mx-auto leading-relaxed">
                        Our restaurant website makes dining easy and delightful from the moment you visit.
                        Explore our beautifully crafted menu with high-quality images and detailed descriptions
                        that will tantalize your taste buds. Easily make reservations through our seamless booking
                        system, ensuring your table is ready when you arrive.
                    </p>
                </motion.div>

                {/* Menu Section */}
                <motion.div 
                    className="bg-white rounded-2xl shadow-xl p-8 mb-12"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <motion.div 
                            className="flex justify-center"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img 
                                src={MenuImage} 
                                alt="Menu" 
                                className="w-64 h-64 object-cover rounded-full shadow-lg"
                            />
                        </motion.div>
                        
                        <div className="space-y-6">
                            <motion.div 
                                className="flex items-center justify-between cursor-pointer"
                                onClick={handleMenuToggle}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <h2 className="text-3xl font-bold text-secondary">Show Menu</h2>
                                <motion.div
                                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-primary"
                                >
                                    {isMenuOpen ? <FiMinus size={24} /> : <FiPlus size={24} />}
                                </motion.div>
                            </motion.div>
                            
                            <AnimatePresence>
                                {isMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-6">
                                            <img 
                                                src={menuChartUrl} 
                                                alt="Menu Chart" 
                                                className="w-full rounded-lg shadow-lg"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Fun Fact Section */}
                <motion.div 
                    className="bg-gradient-to-r from-primary to-orange-600 rounded-2xl p-8 text-white text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.h2 
                        className="text-3xl md:text-4xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Fun Fact: Fastest Delivery
                    </motion.h2>
                    <motion.p 
                        className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        We pride ourselves on offering the fastest delivery service in the area. Our dedicated team 
                        ensures that your food arrives piping hot and fresh, often within 30 minutes of placing your order. 
                        Experience the convenience and reliability of our rapid delivery network, designed to bring you 
                        exceptional dining experiences right to your doorstep.
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};

export default Work;