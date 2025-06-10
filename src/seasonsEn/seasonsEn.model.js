const mongoose = require('mongoose');

const seasonEnSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('SeasonEn', seasonEnSchema); 