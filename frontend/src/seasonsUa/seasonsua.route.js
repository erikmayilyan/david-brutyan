const express = require('express');
const SeasonsUa = require('./seasonsua.model');
const router = express.Router();

router.post('/add-new-season-ua', async (req, res) => {
  try {
    const newSeasonUa = SeasonsUa({
      ...req.body
    });
    const savedSeasonUa = await newSeasonUa.save();
    res.status(201).send(savedSeasonUa);
  } catch (error) {
    console.error('Error Creating Season:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

router.get('/get-seasons-ua', async (req, res) => {
  try {
    const seasonsUa = await SeasonsUa.find();
    res.status(200).json(seasonsUa);
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

    const deletedSeasonUa = await SeasonsUa.findByIdAndDelete(id);

    if (!deletedSeasonUa) {
      return res.status(404).json({ message: 'Season not found.' });
    };

    res.status(200).json({ message: 'Season deleted successfully.', deletedSeasonUa });
  } catch (error) {
    console.error('Error Season Season:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

module.exports = router;