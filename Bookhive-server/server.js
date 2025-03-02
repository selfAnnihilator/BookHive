const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

const postRoutes = require('./routes/postRoutes'); // Correct relative path for post routes

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', postRoutes); // Use post routes

// Database connection
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.send('BookHive API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
