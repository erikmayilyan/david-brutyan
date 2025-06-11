const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ReviewSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }
}, { timestamps: true });

module.exports = model("Review", ReviewSchema);
