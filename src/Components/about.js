import React from 'react';
import ressphoto from '../Assets/restaurant_photo2.jpg'



const about = () => {
  return (
    <div className='about-section-container'>
        
        <div className='about-section-image-container'>
            <img src={ressphoto} alt="" />
        </div>
        <div className='about-section-text-container'>
            <p className='primary-subheading'>About</p>
            <h1 className='primary-heading'>
                Delicious Food: The Key Ingredient to a Balanced and Healthy Diet
            </h1>
            <p className='primary-text'>
            Experience the perfect blend of taste and nutrition with our expertly crafted meals. 
            </p>
            <p className='primary-text'>
            Each dish is designed to provide essential nutrients while delighting your taste buds, 
            making healthy eating an enjoyable part of your lifestyle.
            </p>
            <div className='about-buttons-container'>
                <button className='secondary-button'>Learn more</button>

            </div>


        </div>

    </div>
  )
}

export default about;