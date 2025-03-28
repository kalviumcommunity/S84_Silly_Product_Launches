import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../Components/PostsCard";

export default function Explore() {
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/posts");
      setposts(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch users");
      setLoading(false);
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
        {posts.map((ele) => (
          <PostCard key={ele._id} post={ele} />
        ))}
      </div>
    </>
  );
}
