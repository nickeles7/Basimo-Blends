// components/Footer.js
import React, { useState } from 'react';
import '../styles/Footer.css';

const Footer = ({ content, style }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Here you would integrate with your email marketing service
    console.log(`Subscribing email: ${email}`);
    setSubscribed(true);
    setEmail('');
    // Reset the subscribed message after 5 seconds
    setTimeout(() => setSubscribed(false), 5000);
  };
  
  // Social media icons
  const socialIcons = {
    instagram: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#5c8d76"/>
      </svg>
    ),
    email: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#5c8d76"/>
      </svg>
    )
  };
  
  return (
    <footer className="site-footer" style={{
      backgroundColor: style.background,
      color: style.text_color,
      padding: getPaddingValue(style.padding)
    }}>
      <div className="footer-container">
        {content.newsletter_signup && (
          <div className="footer-newsletter">
            <h3 className="newsletter-title">Join Our Newsletter</h3>
            <p className="newsletter-description">
              Stay updated with new recipes, special offers, and the latest from Basimo Blend.
            </p>
            
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">Subscribe</button>
            </form>
            
            {subscribed && (
              <p className="subscription-success">
                Thanks for subscribing! We'll be in touch soon.
              </p>
            )}
          </div>
        )}
        
        <div className="footer-content">
          <div className="footer-links">
            {content.links.map((link, index) => (
              <a key={index} href={`/${link.toLowerCase().replace(/\s+/g, '-')}`} className="footer-link">
                {link}
              </a>
            ))}
          </div>
          
          {content.social_links.map((social, index) => (
            <a 
              key={index} 
              href={getSocialLink(social)}
              className="social-link"
              aria-label={`Follow us on ${social}`}
              target={social !== 'email' ? '_blank' : ''}
              rel={social !== 'email' ? 'noopener noreferrer' : ''}
            >
              {socialIcons[social] || social}
            </a>
            ))}
          
          <div className="footer-logo">
            <h3 className="footer-brand">Basimo Blend</h3>
            <p className="footer-tagline">Organic Za'atar • Hand-crafted with love</p>
          </div>
        </div>
        
        <div className="footer-legal">
          <p className="copyright">© {new Date().getFullYear()} Basimo Blend. All rights reserved.</p>
          <div className="legal-links">
            <a href="/privacy-policy" className="legal-link">Privacy Policy</a>
            <a href="/terms-of-service" className="legal-link">Terms of Service</a>
          </div>
        </div>
        
        {/* Future Blog/Recipes Section Placeholder */}
        <div className="footer-future-section">
          <h3 className="future-section-title">Coming Soon:|---------|</h3>
          <p className="future-section-description">
            Exciting recipes, cooking tips, and food stories from our community.
            <br />
            <a href="/coming-soon" className="future-section-link">Learn More</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Helper functions
const getPaddingValue = (size) => {
  const paddingSizes = {
    sm: '1.5rem 1rem',
    md: '3rem 1rem',
    lg: '5rem 1rem',
    xl: '7rem 1rem'
  };
  return paddingSizes[size] || '3rem 1rem';
};

const getSocialLink = (social) => {
  // Actual social media profiles with correct links
  const socialLinks = {
    instagram: 'https://www.instagram.com/basimoblends/',
    email: 'mailto:hello@basimoblend.com'
  };
  return socialLinks[social] || '#';
};

export default Footer;