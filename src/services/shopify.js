import Client from 'shopify-buy';

// Log Shopify configuration for debugging
console.log('Initializing Shopify client with:');
console.log('- Domain:', process.env.REACT_APP_SHOPIFY_DOMAIN || 'Not set');
console.log('- Token:', process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'Present (hidden)' : 'Not set');

// Build the Shopify client with explicit error handling
let client;

try {
  // Ensure we have the required configuration
  if (!process.env.REACT_APP_SHOPIFY_DOMAIN || !process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    console.warn('⚠️ Missing Shopify configuration. Using fallback values for development.');
  }

  // Build the client with the domain and token
  client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN || 'basimo-beach-cafe.myshopify.com',
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'dcd890a464359054a962f856efb96509',
  });

  console.log('✅ Shopify client initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Shopify client:', error);

  // Create a mock client for development
  client = {
    checkout: {
      create: () => Promise.resolve({
        id: 'mock-checkout-id',
        webUrl: 'https://basimo-beach-cafe.myshopify.com/cart',
        lineItems: []
      }),
      fetch: () => Promise.reject(new Error('Mock client cannot fetch checkouts')),
      addLineItems: () => Promise.reject(new Error('Mock client cannot add line items')),
      removeLineItems: () => Promise.reject(new Error('Mock client cannot remove line items')),
      updateLineItems: () => Promise.reject(new Error('Mock client cannot update line items'))
    }
  };
}

export default client;