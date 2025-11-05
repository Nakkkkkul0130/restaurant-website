import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, onSellItem }) {
  const navigate = useNavigate();

  const handleSellClick = (item) => {
    navigate(`/client-details/${item.name}`); // Navigate to ClientDetails with item name
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="image-container">
              <img src={item.src} alt={item.alt} />
              <button onClick={() => handleSellClick(item)}>Sell</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
