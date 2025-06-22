import express from "express";
import Card from "../models/Card.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Routes ordered correctly — specific first, generic last

// Create a new card (business users only)
router.post("/", authenticateToken, async (req, res) => {
  if (req.user.role !== "business") {
    return res
      .status(403)
      .json({ message: "Only business users can create cards" });
  }

  try {
    const newCard = new Card({
      ...req.body,
      userId: req.user.id,
    });
    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle favorite
router.patch("/:id/favorite", authenticateToken, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });

    const userId = req.user.id;
    const isFavorited = card.favoritedBy.includes(userId);

    if (isFavorited) {
      card.favoritedBy.pull(userId);
    } else {
      card.favoritedBy.push(userId);
    }

    await card.save();
    res.json({ favorited: !isFavorited });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get cards created by logged-in business user
router.get("/my-cards", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "business") {
      return res.status(403).json({ message: "Access denied" });
    }
    const cards = await Card.find({ userId: req.user.id });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get favorite cards
router.get("/favorites", authenticateToken, async (req, res) => {
  try {
    const cards = await Card.find({ favoritedBy: req.user.id });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all cards
router.get("/", authenticateToken, async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/dashboard-summary", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "business") {
      return res.status(403).json({ message: "Access denied" });
    }

    const userId = req.user.id;

    const cards = await Card.find({ userId });

    const totalCreated = cards.length;
    const totalFavorited = cards.reduce(
      (acc, card) => acc + (card.favoritedBy?.length || 0),
      0
    );
    const recentCards = cards
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);

    res.json({ totalCreated, totalFavorited, recentCards });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single card by ID (must come last)
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update card
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });

    if (card.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete card
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });

    if (card.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await card.deleteOne();
    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
