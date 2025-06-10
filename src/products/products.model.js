const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ProductSchema = new Schema ({
  id: { type: Number },
  name: { type: String, required: true },
  category_ua: { type: String, required: true },
  category_ru: { type: String, required: true },
  category_en: { type: String, required: true },
  season_ua: { type: String, required: true },
  season_ru: { type: String, required: true },
  season_en: { type: String, required: true },
  description_ua: { type: String, required: true },
  description_ru: { type: String, required: true },
  description_en: { type: String, required: true },
  articule: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  image: { type: String },
  color_ua: { type: String, required: true },
  color_ru: { type: String, required: true },
  color_en: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, ref: "User" },
  otherImages: { type: [String] },
  sizes: {
    type: [Number],  
    required: true,
    validate: {
      validator: function (sizes) {
        return sizes.every(size => size >= 35 && size <= 42);
      },
      message: 'Sizes must be between 35 and 42.'
    }
  }
}, { timestamps: true });

module.exports = model('Product', ProductSchema);
