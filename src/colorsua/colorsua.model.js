const mongoose = require('mongoose');

const colorsUaSchema = new mongoose.Schema({
  label : { type: String, required: true },
  value : { type: String, required: true }
});

const ColorsUa = mongoose.model('ColorsUa', colorsUaSchema);
module.exports = ColorsUa; 