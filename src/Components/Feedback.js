import React, { useState } from 'react';
import JohnDoePic from '../Assets/john-doe-image.png';
import salonipic from '../Assets/saloni.jpg';
import michaelpic from '../Assets/michael.png'
import { AiFillStar } from 'react-icons/ai';
import { FiChevronRight } from 'react-icons/fi'; 

const Feedback = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'John Doe',
      text: 'The food was incredibly flavorful and perfectly cooked, with ingredients that tasted fresh and delicious.',
      stars: 5,
      profilePic: JohnDoePic
    },
    {
      name: 'Saloni ',
      text: 'Absolutely loved the ambiance and the variety of dishes! Each bite was a delightful experience.',
      stars: 4,
      profilePic: salonipic
    },
    {
      name: 'Michael Johnson',
      text: 'Fantastic service and the food exceeded my expectations. Will definitely be coming back!',
      stars: 5,
      profilePic: michaelpic
    }
  ];

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className='testimonial-section-wraper'>
      <div className='testimonial-section-top'>
        <p className='primary-subheading'>Feedback</p>
        <h1 className='primary-heading'>What people are saying</h1>
      </div>
      <div className='testimonial-section-bottom'>
        {testimonials[currentTestimonial].profilePic && (
          <img src={testimonials[currentTestimonial].profilePic} alt='' className='profile-pic' />
        )}
        <p>{testimonials[currentTestimonial].text}</p>
        <div className='testimonials-stars-container'>
          {[...Array(testimonials[currentTestimonial].stars)].map((star, index) => (
            <AiFillStar key={index} />
          ))}
        </div>
        <h2>{testimonials[currentTestimonial].name}</h2>
        <button className='next-testimonial-btn' onClick={handleNextTestimonial}>
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Feedback;
