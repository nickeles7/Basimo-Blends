// components/blog/BlogCategories.js
import React from 'react';
import '../../styles/blog/BlogCategories.css';

const BlogCategories = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', label: 'All Posts', icon: '📚' },
    { id: 'Recipes', label: 'Recipes', icon: '🍳' },
    { id: 'Tips', label: 'Cooking Tips', icon: '💡' },
    { id: 'Ingredients', label: 'Ingredients', icon: '🌿' },
    { id: 'Stories', label: 'Stories', icon: '📖' },
    { id: 'Health', label: 'Health & Wellness', icon: '💚' }
  ];

  return (
    <div className="blog-categories">
      <div className="categories-container">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-label">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogCategories;
