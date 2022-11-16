const mongoose = require('mongoose');
const { ModuleFilenameHelpers } = require('webpack');

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stars: Number,
  ingredients: String,
  source: Array,
  timeRequired: Number,
  dateCreated: Date,
});

module.exports = mongoose.model('recipe', RecipeSchema);
