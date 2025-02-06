import React from 'react';
import { Link } from 'react-router-dom';

const Posts = ({ post }) => {
  return (
    <div className='post-container'>
      <Link to={`posts/${post.id}`}>
      <h4 className="post-title">{post.postTitle}</h4>
      <p className="post-date">{post.date}</p></Link>
      <p className="post-body">
      
        { /* post.postBody */
          post.postBody.length <= 25 ? post.postBody : `${post.postBody.slice(0, 25)}...`}
      </p>
    </div>
  );
};

export default Posts;
