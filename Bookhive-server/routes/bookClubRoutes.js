const express = require('express');
const BookClub = require('../models/bookClubModel');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a new book club
router.post('/create', protect, async (req, res) => {
  const { clubName, description } = req.body;
  const user = req.user ? `${req.user.firstName} ${req.user.lastName}` : 'Anonymous'; // Retrieve full name from authenticated user or default to Anonymous

  try {
    const newBookClub = new BookClub({ clubName, description, user });
    await newBookClub.save();
    res.status(201).json(newBookClub);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get the book club creation page
router.get('/create', async (req, res) => {
  res.status(200).json({ message: 'Book club creation page' });
});

// Route to get all book clubs
router.get('/', async (req, res) => {
  try {
    const bookClubs = await BookClub.find({});
    res.status(200).json(bookClubs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
