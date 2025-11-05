import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registrationform.css';

const RegistrationForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
    setRegistered(true);
    setTimeout(() => {
      navigate('/booking-rooms', { state: { name: formData.name } });
    }, 2000); // Wait for 2 seconds before redirecting
  };

  return (
    <div className="form-container">
      {registered ? (
        <div className="success-message">
          Registration complete! Redirecting to booking rooms...
        </div>
      ) : (
        <>
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" onClick={handleSubmit}>Register</button>
        </>
      )}
    </div>
  );
};

export default RegistrationForm;
