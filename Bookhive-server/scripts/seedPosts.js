const mongoose = require('mongoose');
const Post = require('../models/postModel');
require('dotenv').config();

const seedPosts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const samplePosts = [
      { title: 'First Post', content: 'This is the content of the first post.', user: 'User1' },
      { title: 'Second Post', content: 'This is the content of the second post.', user: 'User2' },
      { title: 'Third Post', content: 'This is the content of the third post.', user: 'User3' },
    ];

    await Post.insertMany(samplePosts);
    console.log('Sample posts inserted successfully!');
  } catch (error) {
    console.error('Error inserting posts:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

seedPosts();
