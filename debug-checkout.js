// Test checkout creation and adding items
const Client = require('shopify-buy');

const client = Client.buildClient({
  domain: 'basimo-beach-cafe.myshopify.com',
  storefrontAccessToken: 'dcd890a464359054a962f856efb96509',
});

async function testCheckout() {
  try {
    console.log('🛒 Creating new checkout...');
    
    // Create empty checkout
    const checkout = await client.checkout.create();
    console.log('✅ Checkout created successfully!');
    console.log('Checkout ID:', checkout.id);
    console.log('Checkout webUrl:', checkout.webUrl);
    console.log('');
    
    // Add Za'atar to cart
    console.log('📦 Adding Za\'atar to checkout...');
    const lineItemsToAdd = [{
      variantId: 'gid://shopify/ProductVariant/32608940556427',
      quantity: 1
    }];
    
    const updatedCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
    console.log('✅ Item added successfully!');
    console.log('Updated checkout webUrl:', updatedCheckout.webUrl);
    console.log('Line items count:', updatedCheckout.lineItems.length);
    console.log('Total price:', updatedCheckout.totalPrice.amount, updatedCheckout.totalPrice.currencyCode);
    
    if (updatedCheckout.lineItems.length > 0) {
      console.log('First item:', updatedCheckout.lineItems[0].title);
    }
    
    console.log('\n🔗 FINAL CHECKOUT URL:', updatedCheckout.webUrl);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testCheckout();
