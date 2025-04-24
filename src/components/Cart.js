import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import '../styles/Cart.css';

const Cart = () => {
  const { checkout, isCartOpen, setIsCartOpen, removeItemFromCart, updateItemInCart, isLoading } = useContext(ShopContext);
  
  if (!isCartOpen) return null;
  
  // Handle checkout button click - FIXED WITH DOMAIN CORRECTION
  const handleCheckout = () => {
    if (checkout && checkout.lineItems && checkout.lineItems.length > 0) {
      console.log("🔍 Checkout/Cart object:", checkout);
      console.log("🔍 Checkout/Cart WebURL:", checkout?.webUrl);
  
      if (process.env.REACT_APP_SHOPIFY_DOMAIN) {
        // In production with real Shopify credentials
        try {
          // CRITICAL FIX: Replace basimoblends.com with the actual myshopify domain
          // The webUrl is pointing to basimoblends.com but that domain isn't configured properly
          if (checkout.webUrl) {
            // Replace the domain in the URL
            const shopifyDomain = process.env.REACT_APP_SHOPIFY_DOMAIN;
            const cartPath = checkout.webUrl.split('/cart')[1]; // Get the /c/... part
            
            if (cartPath) {
              // Construct direct URL to Shopify's domain instead of the custom domain
              const fixedCheckoutUrl = `https://${shopifyDomain}/cart${cartPath}`;
              console.log('✅ Redirecting to fixed Shopify cart URL:', fixedCheckoutUrl);
              window.location.href = fixedCheckoutUrl;
              return;
            }
            
            // If we couldn't parse the URL properly, just redirect to the cart
            console.log('⚠️ Could not parse Cart URL, using direct cart link');
            window.location.href = `https://${shopifyDomain}/cart`;
            return;
          } 
          
          // Fallback if webUrl is missing (shouldn't happen)
          const shopifyDomain = process.env.REACT_APP_SHOPIFY_DOMAIN;
          console.log('⚠️ Fallback: Redirecting to direct cart URL');
          window.location.href = `https://${shopifyDomain}/cart`;
        } catch (error) {
          console.error('❌ Error during checkout redirect:', error);
          
          // Last-resort fallback
          const shopifyDomain = process.env.REACT_APP_SHOPIFY_DOMAIN;
          window.location.href = `https://${shopifyDomain}/cart`;
        }
      } else {
        // For development without Shopify credentials
        console.log('🚧 Checkout not available in development mode');
        alert('This is a development environment. In production, this would redirect to the Shopify checkout.');
      }
    } else {
      // Cart is empty, let the user know
      alert('🛒 Your cart is empty. Please add items before checking out.');
    }
  };
  
  return (
    <div className="cart-overlay">
      <div className="cart-drawer">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        
        <div className="cart-items">
          {checkout && checkout.lineItems && checkout.lineItems.length > 0 ? (
            checkout.lineItems.map(item => (
              <div key={item.id} className="cart-item">
                {item.variant && item.variant.image && (
                  <div className="cart-item-image">
                    <img src={item.variant.image.src} alt={item.title} />
                  </div>
                )}
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-variant">{item.variant.title !== 'Default Title' ? item.variant.title : ''}</p>
                  <div className="cart-item-quantity">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateItemInCart(item.id, Math.max(1, item.quantity - 1))}
                      disabled={isLoading}
                    >−</button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateItemInCart(item.id, item.quantity + 1)}
                      disabled={isLoading}
                    >+</button>
                  </div>
                </div>
                <div className="cart-item-price-remove">
                <p className="cart-item-price">
                  ${item.variant.price ? item.variant.price.amount : '0.00'}
                </p>
                  <button 
                    className="remove-item-btn"
                    onClick={() => removeItemFromCart(item.id)}
                    disabled={isLoading}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 18C15.89 18 15 18.89 15 20C15 21.11 15.89 22 17 22C18.11 22 19 21.11 19 20C19 18.89 18.11 18 17 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.11 5.89 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.5C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM7 18C5.89 18 5 18.89 5 20C5 21.11 5.89 22 7 22C8.11 22 9 21.11 9 20C9 18.89 8.11 18 7 18Z" fill="#999"/>
              </svg>
              <p>Your cart is empty</p>
              <button 
                className="continue-shopping"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
        
        {checkout && checkout.lineItems && checkout.lineItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${checkout?.totalPrice?.amount || '0.00'}</span>
            </div>
            <button 
              className="checkout-button"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;