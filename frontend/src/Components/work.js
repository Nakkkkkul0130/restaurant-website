import React from 'react';
import { motion } from 'framer-motion';

const Work = () => {

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
                        Finding your perfect restaurant is now easier than ever. Follow these simple steps
                        to discover amazing dining experiences near you.
                    </p>
                </motion.div>

                {/* Steps Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            step: "01",
                            title: "🍽️ Browse Menu",
                            description: "Explore our extensive menu with 140+ authentic Indian dishes across 18 categories. Filter by your preferences and dietary needs."
                        },
                        {
                            step: "02",
                            title: "🛒 Add to Cart",
                            description: "Select your favorite dishes, customize quantities, and add them to your cart. View real-time pricing and special offers."
                        },
                        {
                            step: "03",
                            title: "🎉 Place Order",
                            description: "Complete your order with multiple payment options. Track your order status from preparation to ready for pickup."
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="text-6xl font-bold text-orange-200 mb-4">{item.step}</div>
                            <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                            <p className="text-accent leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>

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
                        Why Choose Indian Lounge?
                    </motion.h2>
                    <motion.p 
                        className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Experience authentic Indian cuisine with traditional recipes passed down through generations. 
                        Our extensive menu features 140+ dishes, daily rotating specials, and a seamless ordering experience 
                        that brings the taste of India right to your table.
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};

export default Work;