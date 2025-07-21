// components/Header.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import '../styles/Header.css';

const Header = ({ content, style }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setIsCartOpen } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle scroll effect for enhanced sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleCartClick = () => {
    // Connect to Shopify cart drawer via ShopContext
    console.log('Opening Shopify cart drawer');
    setIsCartOpen(true);
  };
  
  // Handle navigation clicks (both internal routes and anchor links)
  const handleNavClick = (e, target) => {
    e.preventDefault();

    // Check if the href is an anchor link
    if (target.startsWith('#')) {
      // If we're not on the homepage, navigate to homepage first
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.getElementById(target.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // We're already on homepage, just scroll
        const element = document.getElementById(target.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setMobileMenuOpen(false);
    } else {
      // For internal routes, use React Router
      navigate(target);
      setMobileMenuOpen(false);
    }
  };
  
  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container" style={{
        gap: style.gap
      }}>
        <div className={`logo-container ${style.logo_alignment === 'center_vertical' ? 'align-center' : ''}`}>
          <Link to={content.logo.link} className="logo-link">
            <img
              src="/Transparent_Logo.png"
              alt="Basimo Blends Logo"
              className={`site-logo-image ${scrolled ? 'scrolled' : ''}`}
            />

            {content.logo.text && content.logo.style.display_inline_with_logo && (
              <span className="site-logo-text" style={{
                fontWeight: content.logo.style.font_weight,
                color: content.logo.style.color,
                letterSpacing: content.logo.style.tracking === 'wide' ? '0.05em' : 'normal'
              }}>
                {content.logo.text}
              </span>
            )}
          </Link>
        </div>
        
        <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''} ${style.nav_alignment === 'middle' ? 'align-middle' : ''}`}>
          <ul className="nav-list">
            {content.navigation.map((item, index) => (
              <li key={index} className="nav-item">
                <a 
                  href={item.link} 
                  className="nav-link"
                  onClick={(e) => handleNavClick(e, item.link)}
                  style={{
                    transition: style.hover_effect?.nav_links?.transition
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="header-actions">
          {content.cart_icon.visible && (
            <button 
              className="cart-button"
              onClick={handleCartClick}
              aria-label="Shopping Cart"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18ZM7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L21.16 5.96C21.26 5.81 21.32 5.63 21.32 5.44C21.32 4.92 20.9 4.5 20.38 4.5H5.21L4.27 2.5H1V4.5H3L6.6 11.59L5.25 13.93C5.09 14.19 5 14.5 5 14.83C5 15.85 5.83 16.67 6.85 16.67H19V14.67H7.42C7.29 14.67 7.17 14.61 7.17 14.75Z" fill="currentColor"/>
              </svg>
            </button>
          )}
          
          {content.mobile_menu.hamburger_toggle && (
            <button 
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
              style={{
                display: style.responsive?.collapse_nav_on_small ? 'flex' : 'none'
              }}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;