import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ name, ingredients, steps, onSave }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-content">
        <h3 className="recipe-title">{name}</h3>
        
        <div className="recipe-section">
          <h4>Ingredients</h4>
          <ul className="recipe-ingredients">
            {ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </div>
        
        <div className="recipe-section">
          <h4>Steps</h4>
          <ol className="recipe-steps">
            {steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
      
      <div className="recipe-actions">
        <button className="btn-secondary" onClick={onSave}>
          Save Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
