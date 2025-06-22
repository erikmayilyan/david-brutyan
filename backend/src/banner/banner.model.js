const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bannerSchema = new mongoose.Schema({
  banner_text_ua: { type: String, required: true },
  banner_text_ru: { type: String, required: true },
  banner_text_en: { type: String, required: true }
});

module.exports = model('Banner', bannerSchema);