import React from 'react';
import './postcard.css'

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <img src={post.image_url} alt={post.name} />
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className='tags'><strong>{post.tags.join(' ')}</strong></div>
    </div>
     
  );
}