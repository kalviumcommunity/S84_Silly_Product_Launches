import React, { useState } from "react";
import axios from "axios";
import "./auth.css";

const API_BASE_URL = "http://localhost:8000"; // Backend base URL

export default function Auth() {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userName: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData); // Debugging log
      if (isSignup) {
        const response = await axios.post(
          `${API_BASE_URL}/users/register`,
          formData
        );
        console.log("Signup response:", response.data); // Debugging log
        alert("Signup successful!");
      } else {
        const { email, password } = formData;
        const response = await axios.post(`${API_BASE_URL}/users/login`, {
          email,
          password,
        });
        console.log("Login response:", response.data); // Debugging log
        alert("Login successful!");
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      console.error(
        "Error during authentication:",
        error.response?.data || error.message
      );
      alert("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? "Signup" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isSignup ? "Signup" : "Login"}</button>
      </form>
      <button className="toggle-btn" onClick={() => setIsSignup(!isSignup)}>
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Signup"}
      </button>
    </div>
  );
}
