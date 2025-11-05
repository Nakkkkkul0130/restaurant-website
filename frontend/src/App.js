import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/home';
import About from './Components/about';
import Work from './Components/work';
import Feedback from './Components/Feedback';
import Contact from './Components/contact';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Layout from './Layout';
import RegistrationForm from './Components/RegistrationForm';
import Welcome from './Components/Welcome';
import BookingRooms from './Components/BookingRooms';
import SpecialOrder from './Components/SpecialOrder';
import Cart from './Components/Cart';
import ClientDetails from './Components/ClientDetails';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleRegister = (formData) => {
    console.log('Registered data:', formData);
  };

  const handleSellItem = (item) => {
    console.log('Selling item:', item);
  };

  const handleClientSubmit = (clientInfo, item) => {
    console.log('Client info:', clientInfo);
    console.log('Item being sold:', item);
  };

  return (
    <div className="App">
      <Routes>
        {/* Auth Routes (without Layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Main Routes (with Layout) */}
        <Route path="/" element={<Layout />}>
          <Route index element={
            <>
              <Home />
              <About />
              <Work />
              <Feedback />
              <Contact />
            </>
          } />
          <Route path="about" element={<About />} />
          <Route path="work" element={<Work />} />
          <Route path="testimonials" element={<Feedback />} />
          <Route path="contact" element={<Contact />} />
          <Route path="special-order" element={<SpecialOrder cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="registration" element={<RegistrationForm onRegister={handleRegister} />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="booking-rooms" element={<BookingRooms />} />
          <Route path="cart" element={<Cart cartItems={cartItems} onSellItem={handleSellItem} />} />
          <Route path="client-details/:item" element={<ClientDetails onSubmit={handleClientSubmit} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;