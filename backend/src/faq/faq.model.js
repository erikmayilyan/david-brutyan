const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const faqSchema = new mongoose.Schema({
  faqId: String,
  faq_question_ua: { type: String, required: true },
  faq_question_ru: { type: String, required: true }, 
  faq_question_en: { type: String, required: true },
  faq_answer_ua: { type: String, required: true },
  faq_answer_ru: { type: String, required: true },
  faq_answer_en: { type: String, required: true }
}); 

module.exports = model('FAQ', faqSchema);
