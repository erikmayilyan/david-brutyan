const express = require('express');
const ColorsRu = require('./colorsru.model');
const router = express.Router();

router.post('/add-new-color-ru', async (req, res) => {
  try {
    const newColor = ColorsRu({
      ...req.body
    });
    const savedColor = await newColor.save();
    res.status(201).send(savedColor);
  } catch (error) {
    console.error('Error Creating Color:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

router.get('/get-colors-ru', async (req, res) => {
  try {
    const colors = await ColorsRu.find();
    res.status(200).json(colors);
  } catch (error) {
    console.error('Error Getting Colors:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID is required.' });
    };

    const deletedColor = await ColorsRu.findByIdAndDelete(id);

    if (!deletedColor) {
      return res.status(404).json({ message: 'Color not found.' });
    };

    res.status(200).json({ message: 'Color deleted successfully.', deletedColor });
  } catch (error) {
    console.error('Error Deleting Color:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

module.exports = router;