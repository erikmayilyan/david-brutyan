const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: String,
  products: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      size: String,
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      total: Number
    }
  ],
  amount: Number,
  email: { type: String, required: true },
  fullName: { type: String, required: true },   
  address: { type: String, required: true },   
  phone: { type: String, required: true }, 
  province: { type: String, required: true },   
  deliveryMethod: { type: String, required: true },
  warehouseNumber: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'completed'],
    default: 'pending'
  },
  status_ua: {
    type: String,
    enum: ['ОЧІКУВАННЯ', 'ОБРОБКА', 'ВІДПРАВЛЕНО', 'ЗАВЕРШЕНО'],
    default: 'ОЧІКУВАННЯ'
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
