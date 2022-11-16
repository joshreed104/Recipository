const mongoose = require('mongoose');
const { ModuleFilenameHelpers } = require('webpack');

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stars: Number,
  ingredients: Array,
  source: Array,
  timeRequired: Number,
  tried: { type: Boolean, required: true },
  dateCreated: { type: String, default: new Date() },
});

module.exports = mongoose.model('recipe', RecipeSchema);
