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
      return next(createError(error, 'recipeController.addRecipe'));
    }
  },
  getRecipes: async (req, res, next) => {
    try {
      if (req.headers.filter !== 'undefined' && req.headers.filter !== 'all') {
        const { filter } = req.headers;
        if (filter != 'false' && filter != 'true') {
          const foundRecipes = await Recipe.find({ stars: filter }).sort({
            dateCreated: -1,
          });
          res.locals.recipes = foundRecipes;
        } else {
          const foundRecipes = await Recipe.find({ tried: filter }).sort({
            dateCreated: -1,
          });
          res.locals.recipes = foundRecipes;
        }
        return next();
      }
      // if getting all recipes, sort newest to oldest
      const foundRecipes = await Recipe.find({}).sort({ dateCreated: -1 });
      res.locals.recipes = foundRecipes;
      return next();
    } catch (error) {
      return next(createError(error, 'recipeController.getRecipe'));
    }
  },
  deleteRecipe: async (req, res, next) => {
    try {
      console.log(req.params);
      const { id } = req.params;
      const deleted = await Recipe.deleteOne({ _id: id });
      res.locals.recipe = deleted;
      return next();
    } catch (error) {
      return next(createError(error, 'recipeController.deleteRecipe'));
    }
  },
};
