// components/ProductShowcase.js
import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import '../styles/ProductShowcase.css';

const ProductShowcase = ({ title, description, products, style }) => {
  // State to track quantity for each product
  const [quantities, setQuantities] = useState(products.map(() => 1));
  // eslint-disable-next-line no-unused-vars
  const { addItemToCart, isLoading } = useContext(ShopContext);

  const handleAddToCart = async (index) => {
    // Log for development
    console.log(`Adding ${quantities[index]} of ${products[index].product_name} to cart`);
    
    // This will be uncommented once Shopify credentials are available
    if (products[index].shopify_variant_id) {
      await addItemToCart(
        products[index].shopify_variant_id,
        quantities[index]
      );
    }
  };

  const increaseQuantity = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const decreaseQuantity = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantities[index] > 1 ? newQuantities[index] - 1 : 1;
    setQuantities(newQuantities);
  };

  return (
    <section className="product-showcase" style={{
      backgroundColor: style.background,
    }}>
      <div className="product-showcase-container">
        <div className="product-showcase-header">
          <h2 className="product-showcase-title">{title}</h2>
          <p className="product-showcase-description">{description}</p>
        </div>
        
        <div className={`products-grid ${style.layout}`}>
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-image-container">
                <img 
                  src={product.image} 
                  alt={product.product_name} 
                  className="product-image" 
                />
              </div>
              
              <div className="product-details">
                <h3 className="product-name">{product.product_name}</h3>
                <div className="product-price">{product.price}</div>
                
                <div className="product-description">
                  <p>{product.description}</p>
                </div>
                
                <div className="product-size">
                  <p>{product.size}</p>
                </div>
                
                <div className="product-actions">
                  <div className="quantity-selector">
                    <button 
                      className="quantity-btn" 
                      onClick={() => decreaseQuantity(index)}
                      disabled={isLoading}
                    >−</button>
                    <span className="quantity-value">{quantities[index]}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => increaseQuantity(index)}
                      disabled={isLoading}
                    >+</button>
                  </div>
                  
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(index)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Adding...' : product.button.text}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;