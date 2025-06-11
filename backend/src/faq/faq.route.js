const express = require('express');
const FAQ = require('./faq.model');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { faq_question_ua, faq_question_ru, faq_question_en, faq_answer_ru, faq_answer_ua, faq_answer_en } = req.body;
    
    const filter = {};

    if (faq_question_ua) {
      filter.faq_question_ua = faq_question_ua;
    };

    if (faq_question_ru) {
      filter.faq_question_ru = faq_question_ru;
    };

    if (faq_question_en) {
      filter.faq_question_en = faq_question_en;
    };

    if (faq_answer_ua) {
      filter.faq_answer_ua = faq_answer_ua;
    };

    if (faq_answer_ru) {
      filter.faq_answer_ru = faq_answer_ru;
    };

    if (faq_answer_en) {
      filter.faq_answer_en = faq_answer_en;
    };

    const faq = await FAQ.find(filter);

    res.status(200).json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error', error
    });
  }
});

router.post('/post-faq', async (req, res) => {
  try {
    const { faqId, faq_question_ua, faq_question_ru, faq_question_en, faq_answer_ua, faq_answer_ru, faq_answer_en } = req.body;

    if (!faq_question_ua || !faq_question_ru || !faq_question_en || !faq_answer_ua || !faq_answer_ru || !faq_question_en) {
      return res.status(400).json({ message: "All Answer And Question Fields Are Required" });
    };

    const newFaq = new FAQ({
      faqId,
      faq_question_ua,
      faq_question_ru,
      faq_question_en,
      faq_answer_ua,
      faq_answer_ru,
      faq_answer_en
    });

    const savedFaq = await newFaq.save();

    res.status(201).json(savedFaq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  };
});

router.get('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ Not Found' });
    }
    res.status(200).json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { faqId } = req.params;
    const deletedFaq = await FAQ.findOneAndDelete({ faqId });
    if (!deletedFaq) {
      return res.status(404).json({ message: 'Faq Not Found' });
    };
    res.status(200).json({ message: 'FAQ Deleted Successfully', deletedFaq });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;
