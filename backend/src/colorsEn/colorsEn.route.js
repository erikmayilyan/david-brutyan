const express = require('express');
const router = express.Router();
const ColorsEn = require('./colorsEn.model');

// Get all colors
router.get('/get-colors-en', async (req, res) => {
  try {
    const colors = await ColorsEn.find();
    res.json(colors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new color
router.post('/add-color-en', async (req, res) => {
  const color = new ColorsEn({
    label: req.body.label,
    value: req.body.value
  });

  try {
    const newColor = await color.save();
    res.status(201).json(newColor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a color
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'ID is required.' });
    }

    const deletedColor = await ColorsEn.findByIdAndDelete(id);

    if (!deletedColor) {
      return res.status(404).json({ message: 'Color not found.' });
    }

    res.status(200).json({ message: 'Color deleted successfully.', deletedColor });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router; 