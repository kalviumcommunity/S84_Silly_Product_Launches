import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FormComponent({ onSubmit }) {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    createdBy: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/all-users");
        console.log("Fetched users:", response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData); // Debugging log
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ...existing form fields... */}
      <label htmlFor="createdBy">Created By:</label>
      <select
        name="createdBy"
        value={formData.createdBy}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select a user
        </option>
        {users.length > 0 ? (
          users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.userName}
            </option>
          ))
        ) : (
          <option disabled>Loading users...</option>
        )}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}
