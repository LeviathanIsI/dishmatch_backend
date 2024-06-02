const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const auth = require('../middleware/auth');

const router = express.Router();

// Secret key for JWT
const jwtSecret = process.env.JWT_SECRET;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

// Google OAuth client
const client = new OAuth2Client(googleClientId);

// Register a new user
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ email, username, password });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id, username: user.username }, jwtSecret, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Authenticate a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id, username: user.username }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ message: 'User authenticated successfully', token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Google OAuth login
router.post('/auth/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: googleClientId,
    });
    const payload = ticket.getPayload();
    const { email, sub: googleId, name: username } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, username, googleId });
      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id, username: user.username }, jwtSecret, { expiresIn: '1h' });

    res.json({ token: jwtToken, username: user.username });
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({ message: 'Google OAuth error', error });
  }
});

// Other routes...

module.exports = router;


// Save recipe to user's profile
router.post('/save-recipe', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { recipeId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.savedRecipes.includes(recipeId)) {
      user.savedRecipes.push(recipeId);
      await user.save();
    }

    res.json({ message: 'Recipe saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Fetch matched recipes for logged-in user
router.get('/matched-recipes', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate({
        path: 'savedRecipes',
        populate: { path: 'creator', model: 'User', select: 'username' }
      });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.savedRecipes);
  } catch (error) {
    console.error('Error fetching matched recipes:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update user preferences
router.put('/preferences', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { likedCreators, cuisinePreferences, timeCommitment, mealTime } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.preferences = {
      likedCreators,
      cuisinePreferences,
      timeCommitment,
      mealTime
    };

    await user.save();

    res.json({ message: 'Preferences updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Fetch user preferences
router.get('/preferences', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ preferences: user.preferences });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
