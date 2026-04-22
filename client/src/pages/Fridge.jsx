import React, { useState } from 'react';
import axios from 'axios';
import FridgePanel from '../components/FridgePanel';
import RecipeCard from '../components/RecipeCard';

const Fridge = () => {
  const [recipes, setRecipes] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const handleRecipesGenerated = (generatedRecipes) => {
    setRecipes(generatedRecipes);
  };

  const handleSaveRecipe = async (recipe) => {
    try {
      const payload = {
        name: recipe.name,
        ingredients: recipe.ingredients,
        steps: recipe.steps
      };
      
      await axios.post('http://localhost:5000/api/recipes', payload);
      
      setToastMessage('Recipe saved successfully!');
      setTimeout(() => setToastMessage(''), 3000);
    } catch (error) {
      console.error('Error saving recipe:', error);
      setToastMessage('Failed to save recipe.');
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <h1>Turn your ingredients into delicious recipes—instantly.</h1>
          <p>
            Add what you already have at home. We’ll suggest tasty, practical recipes with clear steps—so you can cook
            without overthinking.
          </p>
          <div className="hero-badges" aria-label="Product highlights">
            <span className="badge">Fast suggestions</span>
            <span className="badge">Ingredient-first</span>
            <span className="badge">Save favorites</span>
          </div>
        </div>
      </section>
      
      <main className="main-layout">
        <aside className="left-column">
          <FridgePanel onRecipesGenerated={handleRecipesGenerated} />
        </aside>
        
        <section className="right-column">
          {recipes.length === 0 ? (
            <div className="empty-recipes">
              <div className="empty-icon">🍳</div>
              <h3>Add ingredients to get started</h3>
              <p>Build your fridge list, then tap “What can I cook?” to generate recipes tailored to what you have.</p>
            </div>
          ) : (
            <div className="recipe-grid">
              {recipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.name} 
                  name={recipe.name} 
                  ingredients={recipe.ingredients} 
                  steps={recipe.steps} 
                  onSave={() => handleSaveRecipe(recipe)} 
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {toastMessage && (
        <div className="toast">
          {toastMessage}
        </div>
      )}
    </>
  );
};

export default Fridge;
