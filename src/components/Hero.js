// components/Hero.js
import React from 'react';
import '../styles/Hero.css';

const Hero = ({ image, headline, subtext, button, style }) => {
  return (
    <section className="hero" style={{
      backgroundColor: style.background,
      textAlign: style.text_align,
      padding: getPaddingValue(style.padding),
    }}>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-headline">{headline}</h1>
          <p className="hero-subtext">{subtext}</p>
          <button 
            className="cta-button"
            onClick={() => window.location.href = button.link}
          >
            {button.text}
          </button>
        </div>
        <div className="hero-image-container">
          <img
            src={image}
            alt="Basimo Blends Za'atar"
            className={`hero-image ${getImageSizeClass(style.image_size)}`}
          />
          {/* Image placeholder comment */}
          {image.includes('placeholder') && (
            <div className="placeholder-overlay">
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Helper functions for style processing
const getPaddingValue = (size) => {
  const paddingSizes = {
    sm: '1rem',
    md: '2rem',
    lg: '4rem',
    xl: '6rem'
  };
  return paddingSizes[size] || '2rem';
};

const getImageSizeClass = (size) => {
  const sizeClasses = {
    small: 'image-small',
    medium: 'image-medium',
    large: 'image-large'
  };
  return sizeClasses[size] || 'image-medium';
};

export default Hero;