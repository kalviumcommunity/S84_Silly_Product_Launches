import React, { useState } from "react";
import "./editmodal.css";

export default function EditModal({ post, onClose, onSave }) {
  const [updatedPost, setUpdatedPost] = useState({ ...post });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(updatedPost); // Pass the updated post data to the parent component
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Post</h2>
        <input
          type="text"
          name="title"
          value={updatedPost.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="content"
          value={updatedPost.content}
          onChange={handleChange}
          placeholder="Content"
        />
        <input
          type="text"
          name="tags"
          value={updatedPost.tags.join(", ")}
          onChange={(e) =>
            setUpdatedPost((prev) => ({
              ...prev,
              tags: e.target.value.split(",").map((tag) => tag.trim()),
            }))
          }
          placeholder="Tags (comma-separated)"
        />
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
