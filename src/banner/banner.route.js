const express = require('express');
const router = express.Router();
const Banner = require('./banner.model');

router.get('/get-banners', async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/add-banner', async (req, res) => {
  try {
    // Delete any existing banners
    await Banner.deleteMany({});
    
    const newBanner = new Banner({
      ...req.body
    });
    const savedBanner = await newBanner.save();
    res.status(201).send(savedBanner);
  } catch (error) {
    console.error('Error Creating Banner:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBanner = await Banner.findByIdAndUpdate(
      id,
      { banner_text: req.body.banner_text },
      { new: true }
    );
    
    if (!updatedBanner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    
    res.json(updatedBanner);
  } catch (error) {
    console.error('Error Updating Banner:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'ID is required.' });
    }

    const deletedBanner = await Banner.findByIdAndDelete(id);

    if (!deletedBanner) {
      return res.status(404).json({ message: 'Banner not found.' });
    }

    res.status(200).json({ message: 'Banner deleted successfully.', deletedBanner });
  } catch (error) {
    console.error('Error Deleting Banner:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

module.exports = router; 