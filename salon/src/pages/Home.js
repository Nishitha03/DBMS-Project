import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Welcome to Our Salon</h1>
        <p>Experience luxury and style with our premium services</p>
        <Link to="/booking" className="cta-button">Book Now</Link>
      </div>
      
    </div>
  );
}

export default Home;