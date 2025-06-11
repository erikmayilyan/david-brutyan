const express = require('express');
const Reviews = require("./reviews.model");
const Products = require("../products/products.model");
const router = express.Router();

router.post('/post-review', async (req, res) => {
  try {
    const { comment, productId, userId } = req.body;
    if (!comment || !productId || !userId) {
      return res.status(400).send({ message: "All Fields Are Required" });
    };
    const existingReview = await Reviews.findOne({ productId, userId });
    if (existingReview) {
      existingReview.comment = comment;
      await existingReview.save();
    } else {
      const newReview = new Reviews({
        comment, productId, userId
      });
      await newReview.save();
    };
    const reviews = await Reviews.find({ productId });
    if (reviews.length > 0) {
      const product = await Products.findById(productId);
      if (product) {
        await product.save({ validateBeforeSave: false });
      } else {
        return res.status(404).send({ message: "Product Not Found "});
      };
    };
    res.status(200).send({
      message: 'Review Processed Successfully',
      reviews: reviews
    });
  } catch (error) {
    console.error("Error posting review", error);
    res.status(500).send({ message: "Failed To Post Review"});
  }
});

router.get('/total-reviews', async (req, res) => {
  try {
    const totalReviews = await Reviews.countDocuments({});
    res.status(200).send({
      totalReviews
    });
  } catch (error) {
    console.error("Error getting total review", error);
    res.status(500).send({ message: "Failed to get review count" });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send({ message: "User ID is required" });
  };
  try {
    const reviews = await Reviews.find({ userId: userId }).sort({ createdAt: -1 });
    if (reviews.length === 0) {
      return res.status(404).send({ message: "No Reviews Found" });
    };
    res.status(200).send(reviews);
  } catch (error) {
    console.error("Error getting by user", error);
    res.status(500).send({ message: "Failed to fetch reviews by user" });
  }
});

module.exports = router;