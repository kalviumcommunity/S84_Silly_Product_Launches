import React, { useState } from "react";
import "./postcard.css";
import EditModal from "./EditModal";

export default function PostCard({ post, onUpdatePost, onDeletePost }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (updatedPost) => {
    if (typeof onUpdatePost === "function") {
      onUpdatePost(post._id, updatedPost);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (typeof onDeletePost === "function") {
      onDeletePost(post._id);
    }
  };

  return (
    <div className="post-card">
      <div className="card-actions">
        <button className="edit-btn" onClick={() => setIsModalOpen(true)}>
          Edit
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <img src={post.image_url} alt={post.name} />
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="tags">
        <strong>{post.tags.join(" ")}</strong>
      </div>
      {isModalOpen && (
        <EditModal
          post={post}
          onClose={() => setIsModalOpen(false)}
          onSave={handleEdit}
        />
      )}
    </div>
  );
}
