import React, { useState } from 'react';
import axios from 'axios';
import './FridgePanel.css';

const FridgePanel = ({ onRecipesGenerated }) => {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInputValue('');
      setError(null);
    }
  };

  const handleRemoveIngredient = (ingToRemove) => {
    setIngredients(ingredients.filter(ing => ing !== ingToRemove));
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      setError('Please add some ingredients first.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/suggest', {
        ingredients
      });
      onRecipesGenerated(response.data.recipes);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to generate recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fridge-panel">
      <div className="panel-header">
        <h2>Your Fridge</h2>
        <p>Add ingredients you have on hand.</p>
      </div>

      <form className="ingredient-form" onSubmit={handleAddIngredient}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="e.g. eggs, tomatoes, chicken..."
          className="ingredient-input"
        />
        <button type="submit" className="btn-add">Add</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="ingredients-list">
        {ingredients.length === 0 && !error && (
          <p className="empty-state">No ingredients added yet.</p>
        )}
        {ingredients.map(ing => (
          <div key={ing} className="chip">
            <span>{ing}</span>
            <button className="btn-remove" onClick={() => handleRemoveIngredient(ing)} aria-label="Remove ingredient">
              &times;
            </button>
          </div>
        ))}
      </div>

      <button 
        className="btn-primary generate-btn" 
        onClick={handleGenerate} 
        disabled={loading || ingredients.length === 0}
      >
        {loading ? <span className="spinner"></span> : 'What can I cook?'}
      </button>
    </div>
  );
};

export default FridgePanel;
