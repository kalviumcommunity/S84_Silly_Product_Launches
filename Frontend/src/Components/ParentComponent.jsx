import React, { useState } from "react";
import PostCard from "./PostCard";

export default function ParentComponent() {
  const [posts, setPosts] = useState([
    // Example posts
    {
      id: 1,
      title: "Post 1",
      content: "Content 1",
      tags: ["tag1"],
      image_url: "image1.jpg",
    },
    {
      id: 2,
      title: "Post 2",
      content: "Content 2",
      tags: ["tag2"],
      image_url: "image2.jpg",
    },
  ]);

  const handleUpdatePost = async (postId, updatedPost) => {
    try {
      // Make an API call to update the post in the database
      const response = await fetch(`http://localhost:8000/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        const updatedData = await response.json();
        // Update the frontend state with the updated post
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, ...updatedData } : post
          )
        );
      } else {
        console.error("Failed to update post in the database");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      // Make an API call to delete the post in the database
      const response = await fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the post from the frontend state
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } else {
        console.error("Failed to delete post in the database");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onUpdatePost={handleUpdatePost} // Pass the update function
          onDeletePost={handleDeletePost} // Pass the delete function
        />
      ))}
    </div>
  );
}
