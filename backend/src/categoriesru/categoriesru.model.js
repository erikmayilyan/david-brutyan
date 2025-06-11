const mongoose = require('mongoose');

const categoriesRuSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
});

const CategoriesRu = mongoose.model('CategoriesRu', categoriesRuSchema);
module.exports = CategoriesRu;
