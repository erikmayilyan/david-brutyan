const express = require('express');
const CategoriesRu = require('./categoriesru.model');
const router = express.Router();

router.post('/add-new-category-ru', async (req, res) => {
  try {
    const newCategory = CategoriesRu({
      ...req.body
    });
    const savedCategory = await newCategory.save();
    res.status(201).send(savedCategory);
  } catch (error) {
    console.error('Error Creating Category:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

router.get('/get-categories-ru', async (req, res) => {
  try {
    const categories = await CategoriesRu.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error Fetching Categories:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'ID is required.' });
    };

    const deletedCategory = await CategoriesRu.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found.' });
    };

    res.status(200).json({ message: 'Category deleted successfully.', deletedColor });
  } catch (error) {
    console.error('Error Deleting Category:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});

module.exports = router;
