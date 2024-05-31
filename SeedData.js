const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');

// MongoDB connection
mongoose.connect('mongodb+srv://leviathan:Josh1987@cluster0.atr55ns.mongodb.net/dishmatch?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample user ID
const userId = '665a426382d4efa558607d00';

// Seed data for recipes
const recipes = [
  {
    name: 'Spaghetti Carbonara',
    cuisine: 'Italian',
    ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan Cheese', 'Black Pepper'],
    description: 'A classic Italian pasta dish made with eggs, bacon, and cheese.',
    timeToMake: '30 minutes',
    imageUrl: 'https://example.com/spaghetti_carbonara.jpg',
    creator: userId,
  },
  {
    name: 'Chicken Tikka Masala',
    cuisine: 'Indian',
    ingredients: ['Chicken', 'Tomato Sauce', 'Yogurt', 'Spices'],
    description: 'A popular Indian dish consisting of chicken marinated in spices and served in a creamy tomato sauce.',
    timeToMake: '45 minutes',
    imageUrl: 'https://example.com/chicken_tikka_masala.jpg',
    creator: userId,
  },
  // Additional recipes
  {
    name: 'Sushi Rolls',
    cuisine: 'Japanese',
    ingredients: ['Sushi Rice', 'Nori', 'Fish', 'Vegetables'],
    description: 'Delicious sushi rolls filled with fresh fish and vegetables, wrapped in seaweed and rice.',
    timeToMake: '60 minutes',
    imageUrl: 'https://example.com/sushi_rolls.jpg',
    creator: userId,
  },
  {
    name: 'Tacos al Pastor',
    cuisine: 'Mexican',
    ingredients: ['Pork', 'Pineapple', 'Onion', 'Cilantro', 'Corn Tortillas'],
    description: 'Traditional Mexican tacos made with marinated pork and served with pineapple and onion.',
    timeToMake: '45 minutes',
    imageUrl: 'https://example.com/tacos_al_pastor.jpg',
    creator: userId,
  },
  {
    name: 'Mushroom Risotto',
    cuisine: 'Italian',
    ingredients: ['Arborio Rice', 'Mushrooms', 'Vegetable Broth', 'Parmesan Cheese'],
    description: 'Creamy and flavorful risotto made with Arborio rice, mushrooms, and Parmesan cheese.',
    timeToMake: '40 minutes',
    imageUrl: 'https://example.com/mushroom_risotto.jpg',
    creator: userId,
  },
];

// Function to seed data to the database
async function seedData() {
  try {
    // Clear existing data
    await Recipe.deleteMany({});
    console.log('Previous data erased.');

    // Insert recipes into the database
    await Recipe.insertMany(recipes);
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
}

// Call the function to seed the data
seedData();
