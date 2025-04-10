import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../Components/PostsCard";

export default function Explore() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await axios.get("http://localhost:8000/posts", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch posts");
      setLoading(false);
    }
  };

  const handleUpdatePost = async (postId, updatedPost) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      console.log("User not logged in. Showing alert."); // Debugging log
      alert("You must be logged in to edit a post."); // Alert for not logged-in users
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/posts/${postId}`,
        updatedPost,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, ...response.data.post } : post
          )
        );
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      console.log("User not logged in. Showing alert."); // Debugging log
      alert("You must be logged in to delete a post."); // Alert for not logged-in users
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8000/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  if (error)
    return (
      <div className="center">
        <h2>{error}</h2>
      </div>
    );

  return (
    <>
      <div className="center">
        <h1 className="title">Posts</h1>
      </div>
      <div className="post-container">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onUpdatePost={handleUpdatePost}
            onDeletePost={handleDeletePost}
          />
        ))}
      </div>
    </>
  );
}
