import './App.css';
import Home from './Components/home';
import About from './Components/about';
import Work from './Components/work';
import Feedback from './Components/Feedback';
import Contact from './Components/contact';
import Layout from './Layout';
import RegistrationForm from './Components/RegistrationForm';
import Welcome from './Components/Welcome';
import BookingRooms from './Components/BookingRooms'; // New component for booking rooms
import { Route, Routes } from 'react-router-dom';

function App() {
  const handleRegister = (formData) => {
    console.log('Registered data:', formData);
  };

  return (
    <div className="App">
      <Routes>
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
          <Route path="registration" element={<RegistrationForm onRegister={handleRegister} />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="booking-rooms" element={<BookingRooms />} /> {/* New booking rooms route */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
