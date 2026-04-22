const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET /api/recipes - return all saved recipes
router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.find().sort({ savedAt: -1 });
    res.json(recipes);
  } catch (error) {
    next(error);
  }
});

// POST /api/recipes - save a new recipe
router.post('/', async (req, res, next) => {
  try {
    const { name, ingredients, steps } = req.body;
    const newRecipe = new Recipe({ name, ingredients, steps });
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/recipes/:id - delete a recipe by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully', recipe: deletedRecipe });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
