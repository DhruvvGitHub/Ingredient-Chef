import React, { useState } from 'react';
import axios from 'axios';
import FridgePanel from './components/FridgePanel';
import RecipeCard from './components/RecipeCard';
import './App.css';

function App() {
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
      
      // We will adjust payload if needed, but standardizing to what we think backend expects.
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
    <div className="app-container">
      <header className="app-header">
        <h1>Smart Recipe Finder</h1>
        <p>Turn your fridge leftovers into delicious meals.</p>
      </header>
      
      <main className="main-layout">
        <aside className="left-column">
          <FridgePanel onRecipesGenerated={handleRecipesGenerated} />
        </aside>
        
        <section className="right-column">
          {recipes.length === 0 ? (
            <div className="empty-recipes">
              <div className="empty-icon">🍳</div>
              <h3>No recipes generated yet</h3>
              <p>Add your ingredients to the fridge panel and ask what you can cook!</p>
            </div>
          ) : (
            <div className="recipe-grid">
              {recipes.map((recipe, idx) => (
                <RecipeCard 
                  key={idx} 
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
    </div>
  );
}

export default App;
