const express = require('express');
const router = express.Router();
const CategoriesEn = require('./categoriesEn.model');

router.get('/get-categories-en', async (req, res) => {
  try {
    const categories = await CategoriesEn.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/add-category-en', async (req, res) => {
  try {
    const newCategory = CategoriesEn({
      ...req.body
    });
    const savedCategory = await newCategory.save();
    res.status(201).send(savedCategory);
  } catch (error) {
    console.error('Error Creating Category:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'ID is required.' });
    }

    const deletedCategory = await CategoriesEn.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    res.status(200).json({ message: 'Category deleted successfully.', deletedCategory });
  } catch (error) {
    console.error('Error Deleting Category:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

module.exports = router; 