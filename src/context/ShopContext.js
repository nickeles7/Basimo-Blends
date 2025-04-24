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
    } else {
      // For development/testing without Shopify credentials
      createMockCheckout();
    }
  }, []);

  const initializeCheckout = async () => {
    // ✅ Diagnostic logs to verify env variables are loaded in the browser
    // console.log("🧪 [ENV] Domain:", process.env.REACT_APP_SHOPIFY_DOMAIN);
    // console.log("🧪 [ENV] Token:", process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN);
  
    try {
      console.log('Initializing Shopify checkout with domain:', process.env.REACT_APP_SHOPIFY_DOMAIN);
      
      // Try to fetch an existing checkout from localStorage
      const checkoutId = localStorage.getItem('checkoutId');

      // FIXED: Accept Cart IDs and don't try to validate as Checkout IDs
      if (checkoutId) {
        try {
          console.log('Attempting to fetch existing checkout/cart:', checkoutId);
          const existingCheckout = await shopifyClient.checkout.fetch(checkoutId);
          
          console.log('Existing checkout/cart details:', {
            id: existingCheckout.id,
            webUrl: existingCheckout.webUrl,
            completedAt: existingCheckout.completedAt,
            lineItems: existingCheckout.lineItems?.length || 0
          });
      
          // Only use the existing checkout if it's not already completed
          if (existingCheckout && !existingCheckout.completedAt) {
            console.log('Using existing checkout/cart');
            setCheckout(existingCheckout);
            return;
          } else {
            console.log('Existing checkout/cart was already completed, creating new one');
            localStorage.removeItem('checkoutId');
          }
        } catch (error) {
          console.log('Error fetching existing checkout/cart, creating new one:', error);
          localStorage.removeItem('checkoutId');
        }
      } else {
        console.log('⚠️ No checkout/cart ID found in localStorage. Creating fresh checkout/cart.');
      }
      
      // Create a new checkout/cart
      console.log('Creating new Shopify checkout/cart');
      const newCheckout = await shopifyClient.checkout.create();
      
      console.log("🧪 checkout.webUrl (initial):", newCheckout.webUrl);
      console.log('New checkout/cart created:', {
        id: newCheckout.id,
        webUrl: newCheckout.webUrl
      });
      
      localStorage.setItem('checkoutId', newCheckout.id);
      setCheckout(newCheckout);
    } catch (error) {
      console.error('Failed to initialize checkout/cart', error);
      
      if (error.message && error.message.includes('domain')) {
        console.error('Shopify client configuration error. Check your REACT_APP_SHOPIFY_DOMAIN and REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN');
      }
      
      // Fallback to mock checkout for development
      console.log('Falling back to mock checkout/cart');
      createMockCheckout();
    }
  };
  

  // Mock checkout for development without Shopify credentials
  const createMockCheckout = () => {
    console.log('Creating mock checkout/cart for development');
    
    // Get domain from env or use default
    const shopifyDomain = process.env.REACT_APP_SHOPIFY_DOMAIN || 'basimo-beach-cafe.myshopify.com';
    
    // Create a realistic mock checkout object - matching what's coming from the API
    const mockCheckout = {
      id: 'mock-cart-id-' + Date.now(),
      webUrl: `https://${shopifyDomain}/cart`, // Modern cart URL format
      lineItems: [],
      totalPrice: { amount: '0.00', currencyCode: 'USD' },
      completedAt: null,
      createdAt: new Date().toISOString(),
      currencyCode: 'USD',
      email: null,
      requiresShipping: true,
      subtotalPrice: { amount: '0.00', currencyCode: 'USD' },
      taxExempt: false,
      taxesIncluded: false,
      totalTax: { amount: '0.00', currencyCode: 'USD' }
    };
    
    console.log('Created mock checkout/cart with webUrl:', mockCheckout.webUrl);
    setCheckout(mockCheckout);
  };

  const addItemToCart = async (variantId, quantity) => {
    setIsLoading(true);
    try {
      if (checkout) {
        if (process.env.REACT_APP_SHOPIFY_DOMAIN) {
          // Real Shopify integration
          const lineItemsToAdd = [{variantId, quantity}];
          console.log('Adding item to Shopify checkout/cart:', checkout.id, lineItemsToAdd);
          
          try {
            const newCheckout = await shopifyClient.checkout.addLineItems(
              checkout.id,
              lineItemsToAdd
            );
            
            console.log('Updated checkout/cart received from Shopify:', newCheckout);
            console.log('Checkout/Cart URL:', newCheckout.webUrl);
            
            setCheckout(newCheckout);
          } catch (shopifyError) {
            console.error('Shopify API error:', shopifyError);
            
            // If the checkout/cart might be expired or invalid, try creating a new one
            if (shopifyError.message && (
                shopifyError.message.includes('not found') || 
                shopifyError.message.includes('expired') ||
                shopifyError.message.includes('invalid')
              )) {
              console.log('Checkout/cart appears to be invalid, creating a new one...');
              const newCheckout = await shopifyClient.checkout.create();
              console.log("🧪 checkout.webUrl", newCheckout.webUrl);
              localStorage.setItem('checkoutId', newCheckout.id);
              
              // Try adding the item to the new checkout/cart
              try {
                const updatedCheckout = await shopifyClient.checkout.addLineItems(
                  newCheckout.id,
                  lineItemsToAdd
                );
                
                setCheckout(updatedCheckout);
              } catch (error) {
                console.error('Failed to add item to new checkout/cart:', error);
                // Still set the empty checkout/cart so we have something valid
                setCheckout(newCheckout);
              }
            }
          }
        } else {
          // Mock implementation for development
          // Add a mock item to the cart
          const mockItem = {
            id: `mock-item-${Date.now()}`,
            title: 'Za\'atar Blend',
            variant: {
              id: variantId,
              title: 'Default Title',
              price: { amount: '10.95', currencyCode: 'USD' },
              image: { src: '/images/zaatar_2.png' }
            },
            quantity
          };
          
          // Create updated checkout with mock item
          const updatedLineItems = [...checkout.lineItems, mockItem];
          const totalAmount = updatedLineItems.reduce(
            (sum, item) => sum + parseFloat(item.variant.price.amount) * item.quantity, 
            0
          ).toFixed(2);
          
          const newCheckout = {
            ...checkout,
            lineItems: updatedLineItems,
            totalPrice: { amount: totalAmount, currencyCode: 'USD' }
          };
          
          setCheckout(newCheckout);
        }
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
        if (process.env.REACT_APP_SHOPIFY_DOMAIN) {
          // Real Shopify integration
          try {
            const newCheckout = await shopifyClient.checkout.removeLineItems(
              checkout.id,
              [lineItemId]
            );
            setCheckout(newCheckout);
          } catch (error) {
            console.error('Failed to remove item - API error:', error);
            
            // If checkout is invalid, try recreating it
            if (error.message && (
                error.message.includes('not found') || 
                error.message.includes('expired') ||
                error.message.includes('invalid')
              )) {
              const newCheckout = await shopifyClient.checkout.create();
              localStorage.setItem('checkoutId', newCheckout.id);
              setCheckout(newCheckout);
            }
          }
        } else {
          // Mock implementation for development
          const updatedLineItems = checkout.lineItems.filter(item => item.id !== lineItemId);
          const totalAmount = updatedLineItems.reduce(
            (sum, item) => sum + parseFloat(item.variant.price.amount) * item.quantity, 
            0
          ).toFixed(2);
          
          const newCheckout = {
            ...checkout,
            lineItems: updatedLineItems,
            totalPrice: { amount: totalAmount, currencyCode: 'USD' }
          };
          
          setCheckout(newCheckout);
        }
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
        if (process.env.REACT_APP_SHOPIFY_DOMAIN) {
          // Real Shopify integration
          try {
            const newCheckout = await shopifyClient.checkout.updateLineItems(
              checkout.id,
              [{id: lineItemId, quantity}]
            );
            setCheckout(newCheckout);
          } catch (error) {
            console.error('Failed to update item - API error:', error);
            
            // If checkout is invalid, try recreating it
            if (error.message && (
                error.message.includes('not found') || 
                error.message.includes('expired') ||
                error.message.includes('invalid')
              )) {
              const newCheckout = await shopifyClient.checkout.create();
              localStorage.setItem('checkoutId', newCheckout.id);
              setCheckout(newCheckout);
            }
          }
        } else {
          // Mock implementation for development
          const updatedLineItems = checkout.lineItems.map(item => {
            if (item.id === lineItemId) {
              return { ...item, quantity };
            }
            return item;
          });
          
          const totalAmount = updatedLineItems.reduce(
            (sum, item) => sum + parseFloat(item.variant.price.amount) * item.quantity, 
            0
          ).toFixed(2);
          
          const newCheckout = {
            ...checkout,
            lineItems: updatedLineItems,
            totalPrice: { amount: totalAmount, currencyCode: 'USD' }
          };
          
          setCheckout(newCheckout);
        }
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