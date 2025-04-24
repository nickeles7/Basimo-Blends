// components/IngredientsList.js
import React from 'react';
import '../styles/IngredientsList.css';

const IngredientsList = ({ title, ingredients, style }) => {
  // Map ingredient names to image paths
  const ingredientImages = {
    "Organic Dried Thyme": "/images/organic-dried-thyme.jpg",
    "Organic Sesame Seeds (Black & White)": "/images/organic-sesame-seeds-black-white.jpg",
    "Black Cumin (Nigella Sativa)": "/images/black-cumin-nigella-sativa.jpg",
    "Sumac": "/images/sumac.jpg",
    "Celtic Sea Salt": "/images/celtic-sea-salt.jpg",
    "Chia": "/images/chia.jpg",
    "Hemp": "/images/hemp.jpg",
    "Quinoa": "/images/quinoa.jpg",
    "Dulse": "/images/dulse.jpg",
    "Olive Oil": "/images/olive-oil.jpg",
    "Cayenne Pepper": "/images/cayenne-pepper.jpg"
  };

  return (
    <section className="ingredients-section" style={{
      backgroundColor: style.background,
      color: style.text_color,
      fontFamily: style.font === 'sans-serif' ? "'Montserrat', sans-serif" : "'Playfair Display', serif"
    }}>
      <div className="ingredients-container">
        <h2 className="ingredients-title">{title}</h2>
        <p className="ingredients-intro">
          Each ingredient in our Basimo Blends is thoughtfully selected for quality, flavor, and health benefits.
        </p>
        
        <div className="ingredients-grid">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-card">
              <div className="ingredient-image-container">
                <img
                  src={ingredientImages[ingredient] || "/images/ChatGPT Image Apr 23, 2025, 01_17_51 AM.png"}
                  alt={ingredient}
                  className="ingredient-image"
                />
              </div>
              <h3 className="ingredient-name">{ingredient}</h3>
            </div>
          ))}
        </div>
        
        <div className="ingredients-note">
          <p>All ingredients are certified organic and sourced from trusted farms with sustainable practices.</p>
        </div>
      </div>
    </section>
  );
};

export default IngredientsList;