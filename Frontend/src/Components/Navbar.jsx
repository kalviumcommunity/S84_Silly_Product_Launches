// Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate("/auth");
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    alert("Logged out successfully");
    navigate("/auth"); // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>Silly Product Launches</h1>
        </div>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/explore" className="navbar-link">
            Explore
          </Link>
          <Link to="/new-product" className="navbar-link">
            Add Product
          </Link>
          <button className="navbar-button" onClick={handleAuthClick}>
            Signup/Login
          </button>
          <button className="navbar-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
