import React, { createContext, useState, useEffect } from 'react';
import shopifyClient from '../services/shopify';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // This will be enabled once you have Shopify credentials
    if (process.env.REACT_APP_SHOPIFY_DOMAIN) {
      initializeCheckout();
    }
  }, []);

  const initializeCheckout = async () => {
    try {
      // Create a new checkout
      const checkout = await shopifyClient.checkout.create();
      setCheckout(checkout);
      
      // If there's a checkout ID in localStorage, fetch that checkout instead
      const checkoutId = localStorage.getItem('checkoutId');
      if (checkoutId) {
        try {
          const existingCheckout = await shopifyClient.checkout.fetch(checkoutId);
          if (!existingCheckout.completedAt) {
            setCheckout(existingCheckout);
            return;
          }
        } catch (error) {
          localStorage.removeItem('checkoutId');
        }
      }
      
      // Save the new checkout ID
      localStorage.setItem('checkoutId', checkout.id);
    } catch (error) {
      console.error('Failed to initialize checkout', error);
    }
  };

  const addItemToCart = async (variantId, quantity) => {
    setIsLoading(true);
    try {
      // This will work once you have Shopify credentials
      if (checkout) {
        const lineItemsToAdd = [{variantId, quantity}];
        const newCheckout = await shopifyClient.checkout.addLineItems(
          checkout.id,
          lineItemsToAdd
        );
        setCheckout(newCheckout);
      }
    } catch (error) {
      console.error('Failed to add item to cart', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItemFromCart = async (lineItemId) => {
    setIsLoading(true);
    try {
      if (checkout) {
        const newCheckout = await shopifyClient.checkout.removeLineItems(
          checkout.id,
          [lineItemId]
        );
        setCheckout(newCheckout);
      }
    } catch (error) {
      console.error('Failed to remove item from cart', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateItemInCart = async (lineItemId, quantity) => {
    setIsLoading(true);
    try {
      if (checkout) {
        const newCheckout = await shopifyClient.checkout.updateLineItems(
          checkout.id,
          [{id: lineItemId, quantity}]
        );
        setCheckout(newCheckout);
      }
    } catch (error) {
      console.error('Failed to update item in cart', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ShopContext.Provider value={{
      checkout,
      isCartOpen,
      isLoading,
      setIsCartOpen,
      addItemToCart,
      removeItemFromCart,
      updateItemInCart
    }}>
      {children}
    </ShopContext.Provider>
  );
};