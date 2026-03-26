const express = require("express");
const router = express.Router();
const User = require("./model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "secret123";

// 🔥 SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (name.length < 3) {
    return res.status(400).json({ msg: "Name too short" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ msg: "Invalid email" });
  }

  if (phone.length !== 10) {
    return res.status(400).json({ msg: "Phone must be 10 digits" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, JWT_SECRET);

  res.json({ token, user });
});

// 🔥 LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET);

  res.json({ token, user });
});

module.exports = router;