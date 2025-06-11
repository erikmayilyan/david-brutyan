const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bannerSchema = new mongoose.Schema({
  bannerId: String,
  banner_text: { type: String, required: true }
}); 

module.exports = model('Banner', bannerSchema);