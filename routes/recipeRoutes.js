const express = require('express');
const Recipe = require('../models/Recipe');
const User = require('../models/User');

const router = express.Router();

// Create a new recipe
router.post('/', async (req, res) => {
  const { name, cuisine, ingredients, creatorId } = req.body;

  try {
    const creator = await User.findById(creatorId);
    if (!creator) {
      return res.status(400).json({ message: 'Invalid creator ID' });
    }

    const recipe = new Recipe({ name, cuisine, ingredients, creator: creatorId });
    await recipe.save();
    res.status(201).json({ message: 'Recipe created successfully', recipe });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('creator', 'username');
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
