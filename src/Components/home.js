import React from 'react';
import resphoto from '../Assets/restaurant_photo.jpg';
import { FiArrowRight } from 'react-icons/fi';


const Home = () => {
  return (
  <div className='home-container'>
    <div className='home-banner-container'>
        
        <div className='home-text-section'>
            <h1 className='primary-heading'>
            Savor Your Favorite Dishes, Delivered Piping Hot and Incredibly Fresh
            </h1>
            <p className='primary-text'>
            Indulge in the ultimate dining experience from the comfort of your home. 
            Our expertly prepared meals arrive at your doorstep, ensuring each bite 
            is as delicious and fresh as if you were dining with us in person 
            </p>
            <button className='secondary-button'>
               <a href="https://form.jotform.com/nakulbhar7308/restaurant-order-form"> Order Now <FiArrowRight/></a>
            </button>
        </div>
        <div className='rounded-image'>
            <img src={resphoto} alt="" />

        </div>
    </div>
  </div>
  );
}

export default Home;