const express = require('express');
const Blogs = require('./blogs.model');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { title_ua, title_ru, title_en, description_ua, description_ru, description_en, image } = req.query;

    const filter = {};
    if (title_ua) {
      filter.title_ua = title_ua;
    };
    if (title_ru) {
      filter.title_ru = title_ru;
    };
    if (title_en) {
      filter.title_en = title_en;
    };
    if (description_ua) {
      filter.description_ua = description_ua;
    };
    if (description_ru) {
      filter.description_ru = description_ru;
    };
    if (description_en) {
      filter.description_en = description_en;
    };
    if (image) {
      filter.image = image;
    };

    const blogs = await Blogs.find(filter);

    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error', error
    });
  };
});

router.post('/post-blog', async (req, res) => {
  try {
    const { blogId, title_ua, title_ru, title_en, description_ua, description_ru, description_en, image } = req.body;

    if (!title_ua || !title_ru || !title_en || !description_ua || !description_ru || !description_en) {
      return res.status(400).json({ message: "All Title And Description Fields Are Required" });
    };

    const newBlog = new Blogs({
      blogId,
      title_ua,
      title_ru,
      title_en,
      description_ua,
      description_ru,
      description_en,
      image
    });

    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  };
});

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog Not Found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { blogId } = req.params;
    const deletedBlog = await Blogs.findOneAndDelete({ blogId });
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog Not Found' });
    };
    res.status(200).json({ message: 'Blog Deleted Successfully', deletedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;