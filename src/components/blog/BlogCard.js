// components/blog/BlogCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/blog/BlogCard.css';

const BlogCard = ({ post }) => {
  return (
    <div className="blog-card">
      <Link to={`/blog/${post.slug}`} className="blog-card-link">
        <div className="blog-card-image">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            onError={(e) => {
              e.target.src = '/images/zaatar_2.png'; // Fallback image
            }}
          />
          <div className="blog-card-category">
            {post.category}
          </div>
        </div>
        
        <div className="blog-card-content">
          <div className="blog-card-meta">
            <span className="blog-card-date">{post.date}</span>
            <span className="blog-card-read-time">{post.readTime}</span>
          </div>
          
          <h3 className="blog-card-title">{post.title}</h3>
          
          <p className="blog-card-excerpt">{post.excerpt}</p>
          
          <div className="blog-card-tags">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="blog-card-tag">#{tag}</span>
            ))}
            {post.tags.length > 3 && (
              <span className="blog-card-tag-more">+{post.tags.length - 3}</span>
            )}
          </div>
          
          <div className="blog-card-footer">
            <span className="read-more">Read More →</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
