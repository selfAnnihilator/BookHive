const express = require('express');
const Post = require('../models/postModel');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a new post
router.post('/posts', protect, async (req, res) => {
  const { title, content, time } = req.body;
  const user = req.user ? `${req.user.firstName} ${req.user.lastName}` : 'Anonymous'; // Retrieve full name from authenticated user or default to Anonymous

  try {
    const newPost = new Post({ title, content, user, time });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
