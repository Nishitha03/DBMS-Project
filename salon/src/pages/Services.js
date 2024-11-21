import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Services.css';

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  return (
    <div className="services-page">
      <h1>Our Services</h1>
      <div className="services-container">
        {services.map(service => (
          <div key={service.Service_ID} className="service-card">
            <h3>{service.Service_Name}</h3>
            <p>{service.Service_Description}</p>
            <p className="price">Rs.{service.Price}</p>
            <Link to={`/booking?service=${service.Service_ID}`} className="book-button">
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;