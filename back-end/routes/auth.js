import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  console.log("Signup request received:", req.body);

  const {
    firstName,
    middleName,
    lastName,
    phone,
    email,
    password,
    imageUrl,
    imageAlt,
    state,
    country,
    city,
    street,
    houseNumber,
    zip,
    isBusiness,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Signup failed: Email already exists");
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = isBusiness ? "business" : "regular";

    const newUser = new User({
      firstName,
      middleName,
      lastName,
      phone,
      email,
      password: hashedPassword,
      imageUrl,
      imageAlt,
      state,
      country,
      city,
      street,
      houseNumber,
      zip,
      isBusiness,
      role,
    });

    await newUser.save();
    console.log("Signup successful for:", email);

    const token = jwt.sign({ id: newUser._id, role }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role,
        phone: newUser.phone,
        imageUrl: newUser.imageUrl,
        imageAlt: newUser.imageAlt,
        state: newUser.state,
        country: newUser.country,
        city: newUser.city,
        street: newUser.street,
        houseNumber: newUser.houseNumber,
        zip: newUser.zip,
        isBusiness: newUser.isBusiness,
      },
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log("Login request received:", req.body);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Login failed: Email not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Login failed: Invalid password");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const role = user.isBusiness ? "business" : "regular";

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    console.log("Login successful for:", email);

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role,
        phone: user.phone,
        imageUrl: user.imageUrl,
        imageAlt: user.imageAlt,
        state: user.state,
        country: user.country,
        city: user.city,
        street: user.street,
        houseNumber: user.houseNumber,
        zip: user.zip,
        isBusiness: user.isBusiness,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
