const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

const postRoutes = require('./routes/postRoutes'); // Correct relative path for post routes
const bookClubRoutes = require('./routes/bookClubRoutes'); // Import book club routes

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', postRoutes); // Use post routes
app.use('/api', bookClubRoutes); // Use book club routes

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
