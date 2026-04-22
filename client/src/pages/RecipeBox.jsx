import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const RecipeBox = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/recipes');
      setSavedRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${id}`);
      setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== id));
      setToastMessage('Recipe deleted successfully!');
      setTimeout(() => setToastMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting recipe:', error);
      setToastMessage('Failed to delete recipe.');
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  return (
    <>
      <header className="app-header">
        <h1>My Recipe Box</h1>
        <p>All your favorite saved recipes in one place.</p>
      </header>

      {loading ? (
        <div className="empty-recipes">
          <span className="spinner">Loading your recipes...</span>
        </div>
      ) : savedRecipes.length === 0 ? (
        <div className="empty-recipes">
          <div className="empty-icon">📂</div>
          <h3>Your recipe box is empty</h3>
          <p style={{ marginBottom: '1.5rem' }}>Find something to cook with your leftover ingredients.</p>
          <Link to="/">
            <button className="btn-primary" style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>Go to Fridge</button>
          </Link>
        </div>
      ) : (
        <div className="recipe-grid">
          {savedRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe._id}
              name={recipe.name}
              ingredients={recipe.ingredients}
              steps={recipe.steps}
              onDelete={() => handleDelete(recipe._id)}
            />
          ))}
        </div>
      )}

      {toastMessage && (
        <div className="toast">
          {toastMessage}
        </div>
      )}
    </>
  );
};

export default RecipeBox;
