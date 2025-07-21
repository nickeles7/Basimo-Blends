// components/Mission.js - Clean version with just the quote
import React from 'react';
import '../styles/Mission.css';

const Mission = ({ title, content, style }) => {
  return (
    <section className="mission-section" style={{
      backgroundColor: style.background,
      textAlign: style.text_align,
      fontStyle: style.font_style === 'italic' ? 'italic' : 'normal'
    }}>
      <div className="mission-container">
        <h2 className="mission-title">{title}</h2>
        
        <div className="mission-statement">
          <p className="mission-quote">{content}</p>
        </div>
        
        <div className="mission-story">
          <h3 className="story-title">Our Story</h3>
          <p className="story-text">
          (Basimo) in the Aramaic language means ‘delicious'
          Basimo Blends are what we enjoy using in the kitchen! Blending Ingredients that we believe are the key to 'healthy deliciousness’ ;D
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mission;