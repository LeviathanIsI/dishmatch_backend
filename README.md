<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](https://opensource.org/licenses/MIT)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/your-repo-url">
    <img src="https://i.imgur.com/uSgxvre.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">DishMatch Backend</h3>

  <p align="center">
    Backend for the DishMatch application, built with Node.js and Express.
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#environment-variables">Environment Variables</a></li>
        <li><a href="#running-the-server">Running the Server</a></li>
      </ul>
    </li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

The backend for DishMatch is built with Node.js and Express to handle the API requests and manage the application's data.

### Built With

- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/LeviathanIsI/dishmatch_backend.git
   
2. Navigate to the backend directory:
cd DishMatch/backend

2. Install the dependencies:
npm install
Environment Variables
Create a .env file in the root of the backend directory and add the following environment variables:

### Environment Variables
MONGODB_URI="your_mongodb_uri"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
JWT_SECRET="your_jwt_secret"
PORT=5000

### Running the Server
Start the server by running:

node server.js
The server will be running on http://localhost:5000.

### Endpoints
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
License
Distributed under the MIT License. See LICENSE for more information.

Contact
Project Link: [https://github.com/your-repo-url](https://github.com/LeviathanIsI/dishmatch_backend/tree/main)
