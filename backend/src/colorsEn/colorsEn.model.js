const mongoose = require('mongoose');

const colorEnSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ColorEn', colorEnSchema); 