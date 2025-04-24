// components/Testimonials.js
import React, { useState, useEffect } from 'react';
import '../styles/Testimonials.css';

const Testimonials = ({ reviews, style }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // For this demo, we'll add a few more testimonials
  const allReviews = [
    ...reviews,
    {
      quote: "The freshness and quality is unmatched. This has become a staple in my kitchen.",
      name: "Culinary Enthusiast"
    },
    {
      quote: "I love supporting small-batch products like this. The attention to detail shows in every jar.",
      name: "Sustainable Food Advocate"
    }
  ];
  
  // Auto rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === allReviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(timer);
  }, [allReviews.length]);
  
  // Move to a specific testimonial
  const goToReview = (index) => {
    setCurrentIndex(index);
  };
  
  // Handle the Shop Now button click with header offset
  const handleShopNowClick = () => {
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      // Get header height for proper offset
      const headerHeight = document.querySelector('.site-header').offsetHeight;
      
      // Calculate the actual scroll position with offset
      const targetPosition = shopSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      // Scroll to the target with offset
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section className="testimonials-section" style={{
      backgroundColor: style.background,
      fontSize: getFontSize(style.font_size)
    }}>
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Our Customers Say</h2>
        
        <div className="testimonials-carousel">
          <div className="testimonial-slider" style={{
            transform: `translateX(-${currentIndex * 100}%)`
          }}>
            {allReviews.map((review, index) => (
              <div key={index} className="testimonial-slide">
                <div className="quote-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 10C5.12 10 4 11.12 4 12.5V16H7.5V12.5H5.5C5.5 11.67 6.17 11 7 11H7.5V10H6.5ZM16.5 10C15.12 10 14 11.12 14 12.5V16H17.5V12.5H15.5C15.5 11.67 16.17 11 17 11H17.5V10H16.5Z" fill="#5c8d76"/>
                  </svg>
                </div>
                <p className="testimonial-quote">{review.quote}</p>
                <p className="testimonial-author">{review.name}</p>
              </div>
            ))}
          </div>
          
          <div className="carousel-dots">
            {allReviews.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToReview(index)}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="review-cta">
          <p>Join our growing family of satisfied customers.</p>
          <button 
            className="review-cta-button"
            onClick={handleShopNowClick}
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

// Helper function to process font size
const getFontSize = (size) => {
  const sizes = {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem'
  };
  
  return sizes[size] || sizes.md;
};

export default Testimonials;