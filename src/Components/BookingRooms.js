import React from 'react';
import { useLocation } from 'react-router-dom';
import './Registrationform.css';
import singleroom from '../Assets/singleroom.jpg'
import doubleroom from '../Assets/doublebed1.jpg'
import suite from '../Assets/suiteroom1.jpg'

const BookingRooms = () => {
  const location = useLocation();
  const { name } = location.state || { name: 'Guest' };

  const rooms = [
    { id: 1, type: 'Single Bed', price: '$100/night', image: singleroom },
    { id: 2, type: 'Double Bed', price: '$150/night', image: doubleroom },
    { id: 3, type: 'Suite', price: '$250/night', image: suite },
  ];

  return (
    <div className="booking-rooms-container">
      <h1>Hello, {name}! Please select a room to book:</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <img src={room.image} alt={room.type} />

            <h2>{room.type}</h2>
            <p>{room.price}</p>
            <button>Book Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingRooms;
