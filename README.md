# DishMatch Backend

This is the backend for the DishMatch application, built with Node.js and Express.

## Setup

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>

Navigate to the backend directory:
bash
Copy code
cd DishMatch/backend
Install the dependencies:
bash
Copy code
npm install
Environment Variables
Create a .env file in the root of the backend directory and add the following environment variables:

env
Copy code
MONGODB_URI="your_mongodb_uri"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
JWT_SECRET="your_jwt_secret"
PORT=5000
Running the Server
Start the server by running:

bash
Copy code
npm start
The server will be running on http://localhost:5000.

Endpoints
Auth
Register

POST /users/register
Request body: { "email": "user@example.com", "username": "username", "password": "password" }
Login

POST /users/login
Request body: { "email": "user@example.com", "password": "password" }
Google OAuth

POST /auth/google
Request body: { "token": "google_token_id" }
Recipes
Get My Recipes

GET /recipes/my-recipes
Requires authentication
Get Random Recipe

GET /recipes/random
Save Recipe

POST /recipes/add
Requires authentication
Request body: { "recipeId": "recipe_id" }
Preferences
Get Preferences

GET /users/preferences
Requires authentication
Update Preferences

PUT /users/preferences
Requires authentication
Request body: { "likedCreators": true, "cuisinePreferences": [], "timeCommitment": [], "mealTime": [] }
