const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: ["http://localhost:5173", "https://mildo.shop", "https://www.mildo.shop"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.route');
const orderRoutes = require('./src/orders/orders.route');
const statsRoutes = require('./src/stats/stats.route');
const colorsUaRoutes = require('./src/colorsua/colorsua.route');
const colorsRuRoutes = require('./src/colorsru/colorsru.route');
const colorsEnRoutes = require('./src/colorsEn/colorsEn.route');
const categoriesUaRoutes = require('./src/categoriesua/categoriesua.route');
const categoriesRuRoutes = require('./src/categoriesru/categoriesru.route');
const categoriesEnRoutes = require('./src/categoriesEn/categoriesEn.route');
const blogsRoutes = require('./src/blogs/blogs.route');
const opinionRoutes = require('./src/opinion/opinion.route');
const archivedRoutes = require('./src/archivedOpinion/archivedOpinion.route');
const seasonsUaRoutes = require('./src/seasonsUa/seasonsua.route');
const seasonsRuRoutes = require('./src/seasonsRu/seasonsru.route');
const seasonsEnRoutes = require('./src/seasonsEn/seasonsEn.route');
const faqRoutes = require('./src/faq/faq.route');
const bannerRoutes = require('./src/banner/banner.route');
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/colorsUa', colorsUaRoutes);
app.use('/api/colorsRu', colorsRuRoutes);
app.use('/api/colorsEn', colorsEnRoutes);
app.use('/api/categoriesUa', categoriesUaRoutes);
app.use('/api/categoriesRu', categoriesRuRoutes);
app.use('/api/categoriesEn', categoriesEnRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/opinion', opinionRoutes);
app.use('/api/archived', archivedRoutes);
app.use('/api/seasonsUa', seasonsUaRoutes);
app.use('/api/seasonsRu', seasonsRuRoutes);
app.use('/api/seasonsEn', seasonsEnRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/banner', bannerRoutes);

main()
  .then(() => console.log('Mongodb is successfully connected!'))
  .catch(error => console.log(error));

//9Mg0sqv95SQ2M6ak
//mayilyane9

async function main() {
  const dbUri = process.env.DB_URL;
  if (!dbUri) {
    console.error("Database URL is not set in the environment variables.");
    return;
  }
  await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 45000,
  });
  console.log("MongoDB is successfully connected!");
};

const uploadImage = require("./src/utils/uploadImage");

app.post("/api/uploadImage", (req, res) => {
  console.log(req.body.images);
  uploadImage(req.body.images)  
    .then((urls) => res.send(urls)) 
    .catch((err) => res.status(500).send(err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
