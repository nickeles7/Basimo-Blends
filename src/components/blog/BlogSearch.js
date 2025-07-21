// components/blog/BlogSearch.js
import React, { useState } from 'react';
import '../../styles/blog/BlogSearch.css';

const BlogSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="blog-search">
      <form onSubmit={handleSubmit} className="blog-search-form">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search recipes, tips, and stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="search-clear-btn"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        <button type="submit" className="search-submit-btn">
          🔍
        </button>
      </form>
    </div>
  );
};

export default BlogSearch;
