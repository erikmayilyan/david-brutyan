const express = require('express');
const SeasonsRu = require('./seasonsru.model');
const router = express.Router();

router.post('/add-new-season-ru', async (req, res) => {
  try {
    const newSeasonRu = SeasonsRu({
      ...req.body
    });
    const savedSeasonRu = await newSeasonRu.save();
    res.status(201).send(savedSeasonRu);
  } catch (error) {
    console.error('Error Creating Season:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

router.get('/get-seasons-ru', async (req, res) => {
  try {
    const seasonsRu = await SeasonsRu.find();
    res.status(200).json(seasonsRu);
  } catch (error) {
    console.error('Error Fetching Season:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'ID is required.' });
    };

    const deletedSeasonRu = await SeasonsRu.findByIdAndDelete(id);

    if (!deletedSeasonRu) {
      return res.status(404).json({ message: 'Season not found.' });
    };

    res.status(200).json({ message: 'Season deleted successfully.', deletedSeasonRu });
  } catch (error) {
    console.error('Error Season Season:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

module.exports = router;