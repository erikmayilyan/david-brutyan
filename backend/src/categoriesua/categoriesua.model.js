const mongoose = require('mongoose');

const categoriesUaSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
});

const CategoriesUa = mongoose.model('CategoriesUa', categoriesUaSchema);
module.exports = CategoriesUa;
