const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Food = require('../models/Food');
const upload = require('../config/multerConfig');
const path = require('path');
const fs = require('fs');

/* =====================================================
   ROUTE STATIC HARUS DI ATAS DINAMIS !!!
   ===================================================== */

// GET FOODS EXPIRED SOON (H-3)
router.get('/expired-soon', auth, async (req, res) => {
  try {
    const now = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(now.getDate() + 3);

    const foods = await Food.find({
      user: req.user.id,
      expiryDate: { $lte: threeDaysLater, $gte: now }
    }).populate("category");

    res.json(foods);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// FILTER BY CATEGORY
router.get('/category/:categoryId', auth, async (req, res) => {
  try {
    const foods = await Food.find({
      user: req.user.id,
      category: req.params.categoryId
    }).populate("category");

    res.json(foods);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/* =====================================================
   CRUD
   ===================================================== */

// CREATE FOOD
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, quantity, expiryDate, category } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newFood = new Food({
      name,
      quantity,
      expiryDate,
      image: imagePath,
      category,
      user: req.user.id
    });

    const food = await newFood.save();
    res.json(food);
  } catch (err) {
    console.error(err.message);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).send('Server Error');
  }
});

// GET ALL FOODS
router.get('/', auth, async (req, res) => {
  try {
    const foods = await Food.find({ user: req.user.id })
      .populate("category")
      .sort({ expiryDate: 1 });

    res.json(foods);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET FOOD BY ID
router.get('/:id', auth, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate("category");
    if (!food) return res.status(404).json({ msg: 'Food not found' });

    if (food.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });

    res.json(food);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// UPDATE FOOD
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    let food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ msg: 'Food not found' });

    if (food.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });

    if (req.file && food.image) {
      const oldImagePath = path.join(__dirname, '..', food.image);
      fs.unlink(oldImagePath, err => {
        if (err) console.error("Failed to delete old image:", err);
      });
    }

    food.name = req.body.name || food.name;
    food.quantity = req.body.quantity || food.quantity;
    food.expiryDate = req.body.expiryDate || food.expiryDate;
    food.category = req.body.category || food.category;
    if (req.file) food.image = `/uploads/${req.file.filename}`;

    const updated = await food.save();
    res.json(updated);

  } catch (err) {
    console.error(err.message);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).send('Server Error');
  }
});

// DELETE FOOD
router.delete('/:id', auth, async (req, res) => {
  try {
    let food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ msg: 'Food not found' });

    if (food.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });

    if (food.image) {
      const imagePath = path.join(__dirname, '..', food.image);
      fs.unlink(imagePath, err => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    await Food.deleteOne({ _id: req.params.id });

    res.json({ msg: 'Food removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
