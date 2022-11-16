const mongoose = require('mongoose');
const createError = require('./createError');
const Recipe = require('./RecipeModel');

module.exports = {
  addRecipe: async (req, res, next) => {
    const { name, stars, ingredients, source, timeRequired, dateCreated } =
      req.body;
    try {
      const newRecipe = await Recipe.create({
        name,
        stars,
        ingredients,
        source,
        timeRequired,
        dateCreated,
      });
      res.locals.recipe = newRecipe;
      return next();
    } catch (error) {
      return next(createError(error, 'recipeController.addRecipe'));
    }
  },
  getRecipes: async (req, res, next) => {
    try {
      if (req.body.stars) {
        const { stars } = req.body;
        if (stars.exact === true) {
          const foundRecipes = await Recipe.find({ stars: stars.amount });
          res.locals.recipes = foundRecipes;
          return next();
        }
      }
    } catch (error) {
      return next(createError(error, 'recipeController.getRecipe'));
    }
  },
};
