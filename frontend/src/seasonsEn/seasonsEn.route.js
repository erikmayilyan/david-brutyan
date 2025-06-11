const express = require('express');
const router = express.Router();
const SeasonsEn = require('./seasonsEn.model');

// Get all seasons
router.get('/get-seasons-en', async (req, res) => {
  try {
    const seasons = await SeasonsEn.find();
    res.json(seasons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new season
router.post('/add-season-en', async (req, res) => {
  try {
    const newSeason = SeasonsEn({
      ...req.body
    });
    const savedSeason = await newSeason.save();
    res.status(201).send(savedSeason);
  } catch (error) {
    console.error('Error Creating Season:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

// Delete a season
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'ID is required.' });
    }

    const deletedSeason = await SeasonsEn.findByIdAndDelete(id);

    if (!deletedSeason) {
      return res.status(404).json({ message: 'Season not found.' });
    }

    res.status(200).json({ message: 'Season deleted successfully.', deletedSeason });
  } catch (error) {
    console.error('Error Deleting Season:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

module.exports = router; 