const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const OpinionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true }
});

module.exports = model("Opinion", OpinionSchema);
