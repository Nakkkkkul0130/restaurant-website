import React, { useState } from 'react';
import SpecialOrder from './SpecialOrder';

function CartManager() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <div>
      <h1>Cart Manager</h1>
      <SpecialOrder onAddToCart={handleAddToCart} />
      <h3>Shopping Cart</h3>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default CartManager;
