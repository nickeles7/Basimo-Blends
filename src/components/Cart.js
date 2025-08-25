import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import '../styles/Cart.css';

const Cart = () => {
  const { checkout, isCartOpen, setIsCartOpen, removeItemFromCart, updateItemInCart, isLoading, setIsLoading } = useContext(ShopContext);

  if (!isCartOpen) return null;

  // PROPER SHOPIFY CHECKOUT URL FOR HEADLESS COMMERCE
  const handleCheckout = () => {
    if (checkout && checkout.lineItems && checkout.lineItems.length > 0) {
      setIsLoading(true);

      // Use the webUrl provided by Shopify's Storefront API
      // This is the correct URL for headless/API-based checkouts
      const checkoutUrl = checkout.webUrl;

      if (!checkoutUrl) {
        console.error('❌ No checkout URL available');
        alert('Unable to proceed to checkout. Please refresh and try again.');
        setIsLoading(false);
        return;
      }

      console.log('🛒 Cart items:', checkout.lineItems.length);
      console.log('🛒 Total price:', checkout.totalPrice?.amount || '0.00');
      console.log('✅ Redirecting to Shopify checkout:', checkoutUrl);

      // Show a user-friendly message before redirecting
      const itemCount = checkout.lineItems.reduce((total, item) => total + item.quantity, 0);
      const totalAmount = checkout.totalPrice?.amount || '0.00';

      // For production, use a more professional confirmation
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`Ready to checkout with ${itemCount} item(s) for $${totalAmount}? You'll be redirected to our secure Shopify checkout.`)) {
        // Redirect to the Shopify checkout
        // This URL bypasses the password-protected storefront and goes directly to checkout
        window.location.href = checkoutUrl;
      } else {
        setIsLoading(false);
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
              {isLoading ? 'Preparing Checkout...' : 'Checkout'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;