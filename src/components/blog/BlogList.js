// components/blog/BlogList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import BlogSearch from './BlogSearch';
import BlogCategories from './BlogCategories';
import { getAllBlogPosts, getPostsByCategory } from '../../utils/blogUtils';
import '../../styles/blog/BlogList.css';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredPost, setFeaturedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllBlogPosts();
        setPosts(allPosts);
        setFilteredPosts(allPosts);
        
        // Set the most recent post as featured
        if (allPosts.length > 0) {
          setFeaturedPost(allPosts[0]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = getPostsByCategory(posts, selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return (
      <div className="blog-list-container">
        <div className="blog-loading">
          <p>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-list-container">
      {/* Blog Header */}
      <div className="blog-header">
        <div className="blog-header-content">
          <h1 className="blog-title">The Basimo Blends Blog</h1>
          <p className="blog-subtitle">
            Recipes, cooking tips, and stories from our organic spice journey
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="blog-controls">
        <BlogSearch onSearch={handleSearch} />
        <BlogCategories 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'all' && !searchTerm && (
        <div className="featured-post-section">
          <h2 className="section-title">Featured Post</h2>
          <div className="featured-post">
            <Link to={`/blog/${featuredPost.slug}`} className="featured-post-link">
              <div className="featured-post-image">
                <img 
                  src={featuredPost.featuredImage} 
                  alt={featuredPost.title}
                  onError={(e) => {
                    e.target.src = '/images/zaatar_2.png'; // Fallback image
                  }}
                />
              </div>
              <div className="featured-post-content">
                <div className="featured-post-meta">
                  <span className="post-category">{featuredPost.category}</span>
                  <span className="post-date">{featuredPost.date}</span>
                </div>
                <h3 className="featured-post-title">{featuredPost.title}</h3>
                <p className="featured-post-excerpt">{featuredPost.excerpt}</p>
                <div className="featured-post-tags">
                  {featuredPost.tags.map((tag, index) => (
                    <span key={index} className="post-tag">#{tag}</span>
                  ))}
                </div>
                <span className="read-more">Read More →</span>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="blog-posts-section">
        <h2 className="section-title">
          {selectedCategory === 'all' ? 'Recent Posts' : `${selectedCategory} Posts`}
          {searchTerm && ` - Search: "${searchTerm}"`}
        </h2>
        
        {filteredPosts.length === 0 ? (
          <div className="no-posts">
            <p>No posts found. Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="blog-posts-grid">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* Load More Button (for future pagination) */}
      {filteredPosts.length > 6 && (
        <div className="load-more-section">
          <button className="load-more-btn">
            Load More Posts
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;
