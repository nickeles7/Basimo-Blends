// components/blog/RelatedPosts.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/blog/RelatedPosts.css';

const RelatedPosts = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="related-posts">
      <h3 className="related-posts-title">You Might Also Like</h3>
      <div className="related-posts-grid">
        {posts.map((post) => (
          <div key={post.slug} className="related-post-card">
            <Link to={`/blog/${post.slug}`} className="related-post-link">
              <div className="related-post-image">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  onError={(e) => {
                    e.target.src = '/images/zaatar_2.png'; // Fallback image
                  }}
                />
                <div className="related-post-category">
                  {post.category}
                </div>
              </div>
              
              <div className="related-post-content">
                <div className="related-post-meta">
                  <span className="related-post-date">{post.date}</span>
                </div>
                
                <h4 className="related-post-title">{post.title}</h4>
                
                <p className="related-post-excerpt">
                  {post.excerpt.length > 80 
                    ? `${post.excerpt.substring(0, 80)}...` 
                    : post.excerpt
                  }
                </p>
                
                <div className="related-post-tags">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="related-post-tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
