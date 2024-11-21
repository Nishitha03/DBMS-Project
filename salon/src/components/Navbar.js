import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Salon Management</Link>
      </div>
      <div className="navbar-links">
        <Link to="/services">Services</Link>
        <Link to="/booking">Book Appointment</Link>
        {isAuthenticated ? (
          <>
            <Link to="/owner/dashboard">Dashboard</Link>
            <button onClick={logout} className="btn-logout">Logout</button>
          </>
        ) : (
          <Link to="/owner/signin" className="btn-signin">Owner Sign In</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;