import React, { useState } from 'react';

function ClientDetails({ onSubmit, item }) {
  const [clientInfo, setClientInfo] = useState({
    name: '',
    address: '',
    email: '',
    contact: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    onSubmit(clientInfo, item);
  };

  return (
    <div className="client-details">
      {isSubmitted ? (
        <div>
          <h2>Sell Complete!</h2>
          <p>Thank you, {clientInfo.name}. Your order for {item} is confirmed!</p>
        </div>
      ) : (
        <div>
          <h2>Enter Client Information for selling product{item}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={clientInfo.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={clientInfo.address}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={clientInfo.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={clientInfo.contact}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ClientDetails;
