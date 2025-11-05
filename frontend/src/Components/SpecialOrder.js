import React from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../Assets/Detox_Tea.webp';
import image2 from '../Assets/detox4.jpeg';
import image3 from '../Assets/detox5.jpg';

function SpecialOrder({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]); // Add item object to the cart
    navigate('/cart'); // Navigate to the Cart page
  };

  const items = [
    { src: image1, alt: 'Detox Tea', name: 'Item 1' },
    { src: image2, alt: 'Detox Product 2', name: 'Item 2' },
    { src: image3, alt: 'Detox Product 3', name: 'Item 3' }
  ];

  return (
    <div className="special-order">
      <h2>Special Orders</h2>

      <div className="images">
        {items.map((item, index) => (
          <div key={index} className="image-container">
            <img src={item.src} alt={item.alt} />
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpecialOrder;
