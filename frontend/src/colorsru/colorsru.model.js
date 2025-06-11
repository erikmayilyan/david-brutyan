const mongoose = require('mongoose');

const colorsRuSchema = new mongoose.Schema({
  label : { type: String, required: true },
  value : { type: String, required: true }
});

const ColorsRu = mongoose.model('ColorsRu', colorsRuSchema);
module.exports = ColorsRu; 