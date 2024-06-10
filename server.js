require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000', // Localhost for development
    'http://localhost:5173', // Vite dev server
    'https://dishmatch.netlify.app' // Your Netlify frontend
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Static files for uploaded images
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
