const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const archivedOpinionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
});

module.exports = model("ArchivedOpinion", archivedOpinionSchema);
