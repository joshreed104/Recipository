const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const recipeController = require('./recipeController');
require('dotenv').config();
const app = express();

// MongoDB Atlas Connection
const atlasUri = process.env.MONGO_URI;
PORT = 3000;
mongoose.connect(atlasUri);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Routing
app.get('/api/get-recipes', recipeController.getRecipes, (req, res) => {
  res.status(200).json(res.locals.recipes);
});

app.post('/api/add-recipe', recipeController.addRecipe, (req, res) => {
  res.status(200).json(res.locals.recipe);
});

app.delete(
  '/api/delete-recipe/:id',
  recipeController.deleteRecipe,
  (req, res) => {
    console.log('end of endpoint');
    res.status(200).json(res.locals.recipe);
  }
);

app.use('/', (req, res) => {
  res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught an unknown error',
    status: 400,
    message: { err: 'An unknown error occurred' },
  };
  const errorObj = Object.assign({}, defaultError, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Recipe tracker server listening on port ${PORT}`);
});
