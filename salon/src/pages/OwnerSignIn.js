import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/OwnerSignIn.css';

function OwnerSignIn() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials.username, credentials.password)
    // In a real application, validate credentials against backend
    if (credentials.username === 'admin' && credentials.password === 'password') {
      login();
      navigate('/owner/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="signin-page">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>Owner Sign In</h2>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default OwnerSignIn;
