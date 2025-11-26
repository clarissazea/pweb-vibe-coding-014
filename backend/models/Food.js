const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  expiryDate: { type: Date, required: true },
  image: { type: String },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false
  }

}, { timestamps: true });

module.exports = mongoose.model('Food', FoodSchema);
