const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// CREATE
router.post("/", async (req, res) => {
  try {
    const saved = await new Category(req.body).save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json("Category removed");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
