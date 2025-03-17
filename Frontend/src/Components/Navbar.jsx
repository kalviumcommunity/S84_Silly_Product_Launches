// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>Silly Product Launches</h1>
        </div>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/explore" className="navbar-link">Explore</Link>
          <Link to="/new-product" className="navbar-link">Add Product</Link>
        </div>
      </div>
    </nav>
  );
};
