const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;   // ⬅ hapus name

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ email, password }); // ⬅ hapus name

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: user.id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
      if (err) throw err;
      res.json({ token, user });
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
