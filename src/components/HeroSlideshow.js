// components/HeroSlideshow.js
import React, { useState, useEffect } from 'react';
import '../styles/HeroSlideshow.css';

const HeroSlideshow = ({ images, headline, subtext, button, style, interval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [images.length, interval]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <section className="hero-slideshow" style={{
      backgroundColor: style.background,
      textAlign: style.text_align,
      padding: getPaddingValue(style.padding),
    }}>
      <div className="slideshow-container">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ opacity: index === currentSlide ? 1 : 0 }}
          >
            <div className="slide-image-container">
              <img
                src={image}
                alt={`Basimo Blend - Slide ${index + 1}`}
                className={`slide-image ${getImageSizeClass(style.image_size)}`}
              />
            </div>
          </div>
        ))}
        
        <div className="slide-content">
          <h1 className="hero-headline">{headline}</h1>
          <p className="hero-subtext">{subtext}</p>
          <button 
            className="cta-button"
            onClick={() => window.location.href = button.link}
          >
            {button.text}
          </button>
        </div>
        
        <button className="slide-arrow prev" onClick={prevSlide}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
          </svg>
        </button>
        <button className="slide-arrow next" onClick={nextSlide}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/>
          </svg>
        </button>
        
        <div className="slide-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
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

export default HeroSlideshow;