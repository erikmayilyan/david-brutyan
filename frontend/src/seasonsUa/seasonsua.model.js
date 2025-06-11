const mongoose = require('mongoose');

const seasonsUaSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
});

const SeasonsUa = mongoose.model('SeasonsUa', seasonsUaSchema);
module.exports = SeasonsUa;