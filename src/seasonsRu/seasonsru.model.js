const mongoose = require('mongoose');

const seasonsRuSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
});

const SeasonsRu = mongoose.model('SeasonsRu', seasonsRuSchema);
module.exports = SeasonsRu;
