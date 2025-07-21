// components/blog/BlogPost.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import RelatedPosts from './RelatedPosts';
import { getBlogPostBySlug, getAllBlogPosts } from '../../utils/blogUtils';
import '../../styles/blog/BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const postData = await getBlogPostBySlug(slug);
        
        if (!postData) {
          setError('Post not found');
          setLoading(false);
          return;
        }

        setPost(postData);

        // Load related posts
        const allPosts = await getAllBlogPosts();
        const related = allPosts
          .filter(p => p.slug !== slug)
          .filter(p => 
            p.category === postData.category || 
            p.tags.some(tag => postData.tags.includes(tag))
          )
          .slice(0, 3);
        
        setRelatedPosts(related);
        setLoading(false);
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('Failed to load post');
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  // Custom components for markdown rendering
  const markdownComponents = {
    h1: ({ children }) => <h1 className="blog-content-h1">{children}</h1>,
    h2: ({ children }) => <h2 className="blog-content-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="blog-content-h3">{children}</h3>,
    p: ({ children }) => <p className="blog-content-p">{children}</p>,
    ul: ({ children }) => <ul className="blog-content-ul">{children}</ul>,
    ol: ({ children }) => <ol className="blog-content-ol">{children}</ol>,
    li: ({ children }) => <li className="blog-content-li">{children}</li>,
    blockquote: ({ children }) => <blockquote className="blog-content-quote">{children}</blockquote>,
    img: ({ src, alt }) => (
      <img 
        src={src} 
        alt={alt} 
        className="blog-content-img"
        onError={(e) => {
          e.target.src = '/images/zaatar_2.png'; // Fallback image
        }}
      />
    ),
    a: ({ href, children }) => (
      <a href={href} className="blog-content-link" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  };

  if (loading) {
    return (
      <div className="blog-post-container">
        <div className="blog-post-loading">
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-container">
        <div className="blog-post-error">
          <h1>Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="back-to-blog-btn">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      {/* Navigation */}
      <div className="blog-post-nav">
        <Link to="/blog" className="back-to-blog">
          ← Back to Blog
        </Link>
      </div>

      {/* Hero Section */}
      <div className="blog-post-hero">
        <div className="blog-post-hero-image">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            onError={(e) => {
              e.target.src = '/images/zaatar_2.png'; // Fallback image
            }}
          />
        </div>
        <div className="blog-post-hero-content">
          <div className="blog-post-meta">
            <span className="post-category">{post.category}</span>
            <span className="post-date">{post.date}</span>
            <span className="post-read-time">{post.readTime}</span>
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
          <p className="blog-post-excerpt">{post.excerpt}</p>
          <div className="blog-post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="post-tag">#{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="blog-post-content">
        <ReactMarkdown 
          components={markdownComponents}
          remarkPlugins={[remarkGfm]}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Related Products */}
      {post.relatedProducts && post.relatedProducts.length > 0 && (
        <div className="blog-post-products">
          <h3>Featured Products</h3>
          <div className="related-products-grid">
            {post.relatedProducts.map((productId, index) => (
              <div key={index} className="related-product-card">
                <Link to="/#shop" className="product-link">
                  <img
                    src="/images/zaatar_2.png"
                    alt="Basimo Blends Product"
                    className="blog-featured-product-image"
                  />
                  <div className="product-info">
                    <h4>Basimo Blends Organic Za'atar</h4>
                    <p>Perfect for this recipe!</p>
                    <span className="shop-now">Shop Now →</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <RelatedPosts posts={relatedPosts} />
      )}

      {/* Social Sharing */}
      <div className="blog-post-sharing">
        <h4>Share this post</h4>
        <div className="sharing-buttons">
          <button 
            onClick={() => {
              const url = window.location.href;
              const text = `Check out this recipe from Basimo Blends: ${post.title}`;
              if (navigator.share) {
                navigator.share({ title: post.title, text, url });
              } else {
                navigator.clipboard.writeText(url);
                alert('Link copied to clipboard!');
              }
            }}
            className="share-btn"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
