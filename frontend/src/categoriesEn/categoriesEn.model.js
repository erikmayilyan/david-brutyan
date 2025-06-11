const mongoose = require('mongoose');

const categoryEnSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('CategoryEn', categoryEnSchema); 