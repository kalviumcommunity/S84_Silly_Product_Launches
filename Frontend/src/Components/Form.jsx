import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function Form() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
    tags: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      alert("You must log in to create a post.");
      navigate("/auth"); // Redirect to login page
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/posts",
        {
          ...formData,
          tags: formData.tags.split(",").map((tag) => `#${tag.trim()}`),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      setMessage("Post created successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Failed to create post.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            name="content"
            id="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="text"
            name="image_url"
            id="image_url"
            value={formData.image_url}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated):</label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {message && (
        <p
          className={`message ${
            message.startsWith("Post") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
