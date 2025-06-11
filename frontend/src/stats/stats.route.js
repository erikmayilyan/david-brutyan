const express = require('express');
const User = require('../users/user.model');
const Product = require('../products/products.model');
const Order = require('../orders/orders.model');
const Reviews = require('../reviews/reviews.model');
const router = express.Router();

router.get('/user/stats/:email', async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).send({ message: 'Email is required' });
  };
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(404).send({ message: 'User Not Found' });
    };
    const totalPaymentsResult = await Order.aggregate([
      { $match: { email: email } },
      {
        $group: { _id: null, totalAmount: {$sum: "$amount"} }
      }
    ]);
    const totalPaymentsAmount = totalPaymentsResult.length > 0 ? totalPaymentsResult[0].totalAmount : 0;
    console.log(totalPaymentsAmount);
    const totalReviews = await Reviews.countDocuments({ userId: user._id });
    const purchasedProducts = await Order.distinct("products.productId", {email: email});
    const totalPurchasedProducts = purchasedProducts.length;
    res.status(200).send({
      totalPayments: totalPaymentsAmount.toFixed(2),
      totalReviews,
      totalPurchasedProducts
    });
  } catch (error) {
    console.error("Error Fetching Use Stats", error);
    res.status(500).send({ message: 'Failed to Fetch User Stats' });
  }
});

router.get('/admin-stats', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalReviews = await Reviews.countDocuments();
    const totalUsers = await User.countDocuments();

    const totalEarningsResult = await Order.aggregate([
      {$group: {
        _id: null,
        totalEarnings: {$sum: "$amount"}
      }}
    ]);
    const totalEarnings = totalEarningsResult.length > 0 ? totalEarningsResult[0].totalEarnings : 0;

    const monthlyEarningsResult = await Order.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          monthlyEarnings : { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year" : 1, "_id.month" : 1 }
      }
    ]);

    const monthlyEarnings = monthlyEarningsResult.map((entry) => ({
      month: entry._id.month,
      year: entry._id.year,
      earnings: entry.monthlyEarnings.toFixed(2)
    }));
    
    res.status(200).json({
      totalOrders,
      totalProducts,
      totalReviews,
      totalUsers,
      totalEarnings,
      monthlyEarnings
    });
  } catch (error) {
    console.error("Error Fetching Admin Stats", error);
    res.status(500).send({ message: "Failed To Fetch User Stats" });
  }
});

module.exports = router;