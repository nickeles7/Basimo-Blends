// Script to fetch Shopify product and variant IDs for Rosemary Salt
require('dotenv').config();

const SHOPIFY_DOMAIN = process.env.REACT_APP_SHOPIFY_DOMAIN;
const STOREFRONT_ACCESS_TOKEN = process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Extract product ID from Shopify admin URL
// https://admin.shopify.com/store/basimo-beach-cafe/products/8852810367128
const PRODUCT_ID = '8852810367128';

const query = `
  query {
    product(id: "gid://shopify/Product/${PRODUCT_ID}") {
      id
      title
      variants(first: 1) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

async function fetchProductIds() {
  try {
    const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL Errors:', JSON.stringify(data.errors, null, 2));
      return;
    }

    if (data.data && data.data.product) {
      const product = data.data.product;
      const variant = product.variants.edges[0]?.node;

      console.log('\n✅ Rosemary Salt Product IDs:\n');
      console.log('Product ID:', product.id);
      console.log('Variant ID:', variant?.id);
      console.log('\nAdd this to your App.js products array:\n');
      console.log(`{
  product_name: "Rosemary Salt",
  price: "$${variant?.price?.amount || '4.95'}",
  image: "/images/rosemary-salt.png",
  description: "Locally grown rosemary ground fine with Celtic Sea Salt. A fragrant blend that adds an herbal, savory note to roasted vegetables, grilled meats, and finishing dishes.",
  size: "4 Dram Glass Vial (0.5 oz / 14g)",
  shopify_product_id: "${product.id}",
  shopify_variant_id: "${variant?.id}",
  button: {
    text: "Add to Cart",
    action: "shopify:add_to_cart"
  }
}`);
    } else {
      console.log('No product found. Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('Error fetching product IDs:', error.message);
  }
}

fetchProductIds();
