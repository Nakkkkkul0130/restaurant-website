import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JohnDoePic from '../Assets/john-doe-image.png';
import salonipic from '../Assets/saloni.jpg';
import michaelpic from '../Assets/michael.png';
import { AiFillStar } from 'react-icons/ai';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

const Feedback = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'John Doe',
      text: 'The food was incredibly flavorful and perfectly cooked, with ingredients that tasted fresh and delicious.',
      stars: 5,
      profilePic: JohnDoePic,
    },
    {
      name: 'Saloni',
      text: 'Absolutely loved the ambiance and the variety of dishes! Each bite was a delightful experience.',
      stars: 4,
      profilePic: salonipic,
    },
    {
      name: 'Michael Johnson',
      text: 'Fantastic service and the food exceeded my expectations. Will definitely be coming back!',
      stars: 5,
      profilePic: michaelpic,
    },
  ];

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePreviousTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-primary font-bold text-2xl md:text-3xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Feedback
          </motion.p>
          <motion.h1 
            className="text-primary-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            What people are saying
          </motion.h1>
        </motion.div>

        {/* Testimonial Content */}
        <motion.div 
          className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Navigation Buttons */}
          <motion.button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300 z-10"
            onClick={handlePreviousTestimonial}
            whileHover={{ scale: 1.2, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronLeft size={32} />
          </motion.button>

          <motion.button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300 z-10"
            onClick={handleNextTestimonial}
            whileHover={{ scale: 1.2, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronRight size={32} />
          </motion.button>

          {/* Testimonial Details */}
          <div className="text-center space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Profile Picture */}
                <motion.div 
                  className="flex justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={testimonials[currentTestimonial].profilePic}
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary shadow-lg"
                  />
                </motion.div>

                {/* Testimonial Text */}
                <p className="text-lg md:text-xl text-accent leading-relaxed max-w-2xl mx-auto font-medium">
                  "{testimonials[currentTestimonial].text}"
                </p>

                {/* Star Rating */}
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonials[currentTestimonial].stars)].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <AiFillStar className="text-2xl text-primary" />
                    </motion.div>
                  ))}
                </div>

                {/* Author Name */}
                <h2 className="text-2xl md:text-3xl font-bold text-secondary">
                  {testimonials[currentTestimonial].name}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;