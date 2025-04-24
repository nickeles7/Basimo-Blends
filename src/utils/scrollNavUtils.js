// utils/scrollNavUtils.js

/**
 * Sets up intersection observers to handle active navigation states
 * based on visible sections
 */
export const setupScrollNav = () => {
  // Function to initialize observers and event listeners
  const initNav = () => {
    // Get all section elements
    const sections = document.querySelectorAll('section[id]');
    
    // Set up the Intersection Observer
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '-80px 0px -70% 0px', // Adjust to account for header height
      threshold: 0 // Trigger as soon as any part is visible
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Get the corresponding nav link
        const id = entry.target.getAttribute('id');
        const navLinks = document.querySelectorAll(`.nav-link[href*="#${id}"]`);
        
        navLinks.forEach(navLink => {
          if (entry.isIntersecting) {
            // Add active class when section is in view
            navLink.classList.add('active');
            
            // Update URL hash without scrolling (for bookmarking)
            const currentHash = window.location.hash;
            const newHash = `#${id}`;
            
            if (currentHash !== newHash) {
              // Update URL without triggering scroll - using window.history instead of global history
              window.history.replaceState(null, null, newHash);
            }
          } else {
            // Remove active class when section is out of view
            navLink.classList.remove('active');
          }
        });
      });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
      observer.observe(section);
    });
    
    // Handle smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Get header height for proper offset
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          
          // Calculate the actual scroll position with offset
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          // Scroll to the target with offset
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Check if we have a hash in the URL on page load
    if (window.location.hash) {
      // Wait a bit for the page to fully load
      setTimeout(() => {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Get header height for proper offset
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          
          // Calculate the actual scroll position with offset
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          // Scroll to the target with offset
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }, 500);
    }
  };
  
  // Initialize as soon as possible
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initNav();
  } else {
    document.addEventListener('DOMContentLoaded', initNav);
  }
};

/**
 * Updates the active navigation link based on scroll position
 * Alternative approach without using Intersection Observer
 */
export const updateActiveNavOnScroll = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const headerHeight = document.querySelector('.site-header').offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 20; // Additional offset for better UX
      const sectionHeight = section.clientHeight;
      
      // Determine when a section is in the viewport
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
};