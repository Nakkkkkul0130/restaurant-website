import React, { useState } from 'react';
import MenuImage from "../Assets/pick-meals-image.png";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Work = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const workInfoData = [
        {
            image: MenuImage,
            title: "Menu",
            text: `
Discover our diverse Indian menu, featuring a wide array of delectable dishes to suit every palate. From rich and creamy Butter Chicken to the tangy and spicy flavors of Chole Bhature, our menu is a culinary journey through India's vibrant cuisine. Savor the tender, marinated pieces of Tandoori Chicken, or delight in the aromatic Biryani, cooked to perfection with fragrant spices. Vegetarians will love our Paneer Tikka, and the flavorful Dal Makhani. Each dish is prepared with the freshest ingredients and traditional spices, 
ensuring an authentic and unforgettable dining experience. Join us and explore the rich tapestry of Indian flavors, all expertly crafted to delight your senses.
            `,
            dishes: [
                "Butter Chicken",
                "Chole Bhature",
                "Tandoori Chicken",
                "Biryani",
                "Paneer Tikka",
                "Dal Makhani",
                "Rogan Josh",
                "Masala Dosa",
                "Malai Kofta",
                "Pani Puri"
            ]
        }
    ];

    const fastestDeliveryFact = {
        title: "Fun Fact: Fastest Delivery",
        text: "We pride ourselves on offering the fastest delivery service in the area. Our dedicated team ensures that your food arrives piping hot and fresh, often within 30 minutes of placing your order. Experience the convenience and reliability of our rapid delivery network, designed to bring you exceptional dining experiences right to your doorstep."
    };

    return (
        <div className='work-section-wrapper'>
            <div className='work-section-top'>
                <h1 className='primary-subheading'>How It Works</h1>
                <p className='primaries-text'>
                    Our restaurant website makes dining easy and delightful from the moment you visit.
                    Explore our beautifully crafted menu with high-quality images and detailed descriptions
                    that will tantalize your taste buds. Easily make reservations through our seamless booking
                    system, ensuring your table is ready when you arrive. Order online for a quick and convenient
                    takeaway or delivery experience, perfect for busy days or cozy nights in. Stay updated with our
                    latest promotions and events, and join our loyalty program for exclusive rewards. Discover the
                    perfect blend of convenience and culinary excellence with every click.
                </p>
            </div>
            <div className='work-section-bottom'>
                {
                    workInfoData.map((data, index) => (
                        <div className='work-section-info' key={index}>
                            <div className='info-boxes-img-container'>
                                <img src={data.image} alt="Menu" />
                            </div>
                            <h2>
                                {data.title} 
                                <span onClick={handleMenuToggle} style={{cursor: 'pointer'}}>
                                    {isMenuOpen ? <FiChevronUp /> : <FiChevronDown />}
                                </span>
                            </h2>
                            <p className='info-text'>{data.text}</p>
                            {isMenuOpen && (
                                <ul className='dishes-list'>
                                    {data.dishes.map((dish, dishIndex) => (
                                        <li key={dishIndex}>{dish}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))
                }
            </div>

            <div className='fastest-delivery-fact'>
                <h2>{fastestDeliveryFact.title}</h2>
                <p>{fastestDeliveryFact.text}</p>
            </div>
        </div>
    );
};

export default Work;
