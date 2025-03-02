const express = require('express');
const Post = require('../models/postModel');

const router = express.Router();

// Route to create a new post
router.post('/posts', async (req, res) => {
  const { title, content, user, time } = req.body;

  try {
    const newPost = new Post({ title, content, user, time });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
