import React, { useState } from 'react';
// import './Faq.css';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is your delivery policy?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, libero eu tincidunt interdum."
    },
    // Add more FAQs as needed
  ];

  const toggleFaq = index => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className='faq-container'>
      <h1 className='primary-heading'>Frequently Asked Questions</h1>
      <div className='faq-content'>
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <div className='faq-question' onClick={() => toggleFaq(index)}>
              {faq.question}
            </div>
            <div className='faq-answer'>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
