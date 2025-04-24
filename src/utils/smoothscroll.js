// utils/smoothscroll.js

/**
 * Smooth scrolling polyfill for older browsers
 * Based on: https://github.com/iamdustan/smoothscroll
 */
export const installSmoothScrollPolyfill = () => {
    // Return early if 'scrollBehavior' is already supported
    if ('scrollBehavior' in document.documentElement.style) {
      return;
    }
  
    // Step value for the animation
    const SCROLL_TIME = 468;
  
    // Get the top position of an element relative to the document
    const getElementY = (element) => {
      return element.getBoundingClientRect().top + window.pageYOffset;
    };
  
    // Ease in out function:
    // acceleration until halfway, then deceleration
    const easeInOutCubic = (t) => {
      return t < 0.5
        ? 4 * t * t * t
        : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
  
    // Calculate the scroll position
    const position = (start, end, elapsed, duration) => {
      if (elapsed > duration) return end;
      return start + (end - start) * easeInOutCubic(elapsed / duration);
    };
  
    // Animate the scroll
    const smoothScroll = (el, duration) => {
      duration = duration || SCROLL_TIME;
      
      const startingY = window.pageYOffset;
      const elementY = getElementY(el);
      const targetY = document.body.scrollHeight - elementY < window.innerHeight
        ? document.body.scrollHeight - window.innerHeight
        : elementY;
      
      const diff = targetY - startingY;
      if (!diff) return;
      
      const start = Date.now();
      
      const step = () => {
        const elapsed = Date.now() - start;
        const scrollPosition = position(startingY, targetY, elapsed, duration);
        
        window.scrollTo(0, scrollPosition);
        
        if (elapsed < duration) {
          window.requestAnimationFrame(step);
        }
      };
      
      step();
    };
  
    // Polyfill the Element.scrollIntoView method
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    
    Element.prototype.scrollIntoView = function(options) {
      if (!options || typeof options !== 'object' || options.behavior !== 'smooth') {
        return originalScrollIntoView.call(this, options);
      }
      
      return smoothScroll(this);
    };
  };
  
  // Auto-install the polyfill
  installSmoothScrollPolyfill();