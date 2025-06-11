const express = require('express');
const Products = require('./products.model');
const Reviews = require("../reviews/reviews.model");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

router.post('/create-product', async (req, res) => {
  try {
    console.log('Received Product Data:', req.body);
    if (req.body.otherImages && Array.isArray(req.body.otherImages)) {
      req.body.otherImages = req.body.otherImages.filter(image => image.startsWith('http'));
    } else {
      req.body.otherImages = [];
    };
    const newProduct = new Products({
      ...req.body
    });
    const savedProduct = await newProduct.save();
    const reviews = await Reviews.find({ productId: savedProduct.id });
    res.status(201).send(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error', error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const { articule, season, category, color, minprice, maxprice, page = 1, limit = 10, language } = req.query;

    let filter = {};

    if (category && category !== "all") {
      if (language === 'ua') {
        filter.category_ua = category;
      } else if (language === 'ru') {
        filter.category_ru = category;
      } else {
        filter.category_en = category;
      }
    };

    if (season && season !== "all") {
      console.log("Filtering by season:", { season, language });
      if (language === 'ua') {
        filter.season_ua = season;
      } else if (language === 'ru') {
        filter.season_ru = season;
      } else {
        filter.season_en = season;
      }
      console.log("Applied season filter:", filter);
    };

    if (color && color !== "all") {
      if (language === 'ua') {
        filter.color_ua = color;
      } else if (language === 'ru') {
        filter.color_ru = color;
      } else {
        filter.color_en = color;
      }
    };

    const min = minprice && !isNaN(Number(minprice)) ? Number(minprice) : undefined;
    const max = maxprice && !isNaN(Number(maxprice)) ? Number(maxprice) : undefined;

    if (min !== undefined || max !== undefined) {
      filter.price = {};  
      if (min !== undefined) filter.price.$gte = min;  
      if (max !== undefined) filter.price.$lte = max;  
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalProducts = await Products.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));

    const products = await Products.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.status(200).send({ products, totalPages, totalProducts });
  } catch (error) {
    console.error("Error fetching products:", error.stack);
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Products.findById(productId).populate("author", "email username");
    if (!product) {
      return res.status(404).send({ message: "Product Not Found" });
    };
    const reviews = await Reviews.find({ productId }).populate("userId", "username email");
    res.status(200).send({ product, reviews });
  } catch (error) {
    console.error('Error fetching product:', error.stack);
    res.status(500).json({ message: 'Internal server error', error: error });
  };
});

router.patch("/update-product/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    console.log('Received Update Data:', req.body); 
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,             
      { $set: req.body },    
      { new: true }          
    );
    if (!updatedProduct) {
      return res.status(404).send({ message: "Product Not Found" });
    };
    res.status(200).send({
      message: "Product Updated Successfully",
      product: updatedProduct
    });
  } catch (error) {
    console.error("Error fetching the product:", error);
    res.status(500).send({ message: "Failed to Fetch The Product" });
  };
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Products.findByIdAndDelete(id);  // Assuming you use Mongoose
    if (result) {
      return res.status(200).send({ message: "Product deleted successfully" });
    } else {
      return res.status(404).send({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Error deleting product" });
  }
});


router.get("/related/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Product ID is Required" });
    };
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).send({ message: "Product Not Found" });
    };
    const createTitleRegex = (product) => {
      const words = [
        ...product.name.split(" ").filter((word) => word.length > 1),
        ...product.name_ua.split(" ").filter((word) => word.length > 1),
        ...product.name_ru.split(" ").filter((word) => word.length > 1),
      ];
      return new RegExp(words.join("|"), "i");
    };
    const titleRegex = createTitleRegex(product);
    console.log(titleRegex);
    const relatedProducts = await Products.find({
      _id: { $ne: id },
      $or: [
        { name: {$regex: titleRegex} },
        { category: product.category }
      ]
    });
    res.status(200).send(relatedProducts);
  } catch (error) {
    console.error("Error Fetching The Related Product", error);
    res.status(500).send({ message: "Failed to Fetch Related The Product" });
  }
});

module.exports = router;