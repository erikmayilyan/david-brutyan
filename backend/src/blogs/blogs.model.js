const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const blogsSchema = new mongoose.Schema({
  blogId: String,
  title_ua: { type: String, required: true },
  title_ru: { type: String, required: true },
  title_en: { type: String, required: true },
  description_ua: { type: String, required: true },
  description_ru: { type: String, required: true },
  description_en: { type: String, required: true },
  image: { type: String }
}); 

module.exports = model('Blogs', blogsSchema);
