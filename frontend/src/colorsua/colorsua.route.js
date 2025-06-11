const express = require('express');
const ColorsUa = require('./colorsua.model');
const router = express.Router();

router.post('/add-new-color-ua', async (req, res) => {
  try {
    const newColor = ColorsUa({
      ...req.body
    });
    const savedColor = await newColor.save();
    res.status(201).send(savedColor);
  } catch (error) {
    console.error('Error Creating Color:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

router.get('/get-colors-ua', async (req, res) => {
  try {
    const colors = await ColorsUa.find();
    res.status(200).json(colors);
  } catch (error) {
    console.error('Error Fetching Colors:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'ID is required.' });
    };

    const deletedColor = await ColorsUa.findByIdAndDelete(id);

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