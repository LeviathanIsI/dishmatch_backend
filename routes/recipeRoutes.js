const express = require('express');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new recipe (protected route)
router.post('/create', auth, async (req, res) => {
  const { name, cuisine, ingredients, description, timeToMake } = req.body;

  if (!name || !cuisine || !ingredients || !description || !timeToMake) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const recipe = new Recipe({
      name,
      cuisine,
      ingredients: ingredients.split(','),
      description,
      timeToMake,
      creator: req.user.userId,
    });
    await recipe.save();

    // Find the user by ID and update their "myRecipes" array
    await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { myRecipes: recipe._id } },
      { new: true }
    );

    res.status(201).json({ message: 'Recipe created successfully', recipe });
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all recipes (protected route)
router.get('/', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('creator', 'username');
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get random recipes (protected route)
router.get('/random', auth, async (req, res) => {
  try {
    const count = await Recipe.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const recipe = await Recipe.findOne().skip(randomIndex).populate('creator', 'username');
    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Add recipe to user's saved recipes (protected route)
router.post('/add', auth, async (req, res) => {
  const { recipeId } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!user.savedRecipes.includes(recipeId)) {
      user.savedRecipes.push(recipeId);
      await user.save();
    }

    res.status(200).json({ message: 'Recipe added to saved recipes' });
  } catch (error) {
    console.error('Error adding recipe to saved recipes:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get recipes created by the logged-in user (protected route)
router.get('/my-recipes', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ creator: req.user.userId }).populate('creator', 'username');
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;