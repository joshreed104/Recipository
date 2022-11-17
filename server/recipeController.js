const mongoose = require('mongoose');
const createError = require('./createError');
const Recipe = require('./RecipeModel');

module.exports = {
  addRecipe: async (req, res, next) => {
    const {
      name,
      stars,
      ingredients,
      source,
      timeRequired,
      dateCreated,
      tried,
    } = req.body;
    try {
      const newRecipe = await Recipe.create({
        name,
        stars,
        ingredients,
        source,
        timeRequired,
        dateCreated,
        tried,
      });
      res.locals.recipe = newRecipe;
      return next();
    } catch (error) {
      console.log(req.body);
      return next(createError(error, 'recipeController.addRecipe'));
    }
  },
  getRecipes: async (req, res, next) => {
    try {
      if (req.body.stars) {
        console.log(req.headers);
        const { stars } = req.body;
        if (stars.exact === true) {
          const foundRecipes = await Recipe.find({ stars: stars.amount });
          res.locals.recipes = foundRecipes;
          return next();
        }
      }
      console.log('hello');
      // if getting all recipes, sort newest to oldest
      const foundRecipes = await Recipe.find({}).sort({ dateCreated: -1 });
      res.locals.recipes = foundRecipes;
      return next();
    } catch (error) {
      return next(createError(error, 'recipeController.getRecipe'));
    }
  },
};
