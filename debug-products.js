// Quick script to fetch product and variant information from Shopify
// Run this with: node debug-products.js

const Client = require('shopify-buy');

// Your Shopify configuration
const client = Client.buildClient({
  domain: 'basimo-beach-cafe.myshopify.com',
  storefrontAccessToken: 'dcd890a464359054a962f856efb96509',
});

async function fetchProducts() {
  try {
    console.log('🔍 Fetching products from Shopify...');
    
    // Fetch all products
    const products = await client.product.fetchAll();
    
    console.log(`\n📦 Found ${products.length} products:\n`);
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title}`);
      console.log(`   Product ID: ${product.id}`);
      console.log(`   Handle: ${product.handle}`);
      console.log(`   Available: ${product.availableForSale}`);
      console.log(`   Variants:`);
      
      product.variants.forEach((variant, vIndex) => {
        console.log(`     ${vIndex + 1}. ${variant.title}`);
        console.log(`        Variant ID: ${variant.id}`);
        console.log(`        Price: $${variant.price.amount} ${variant.price.currencyCode}`);
        console.log(`        Available: ${variant.available}`);
        if (variant.image) {
          console.log(`        Image: ${variant.image.src}`);
        }
      });
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Error fetching products:', error);
  }
}

fetchProducts();
