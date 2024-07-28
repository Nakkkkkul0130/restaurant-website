import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Welcome = () => {
  const location = useLocation();
  const { name } = location.state || { name: 'Guest' };
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/booking-rooms', { state: { name } });
    }, 2000); 

    return () => clearTimeout(timer); 
  }, [name, navigate]);

  return (
    <div className="welcome-container">
      <h1>Hello, {name}! Now you are eligible for booking.</h1>
    </div>
  );
};

export default Welcome;
