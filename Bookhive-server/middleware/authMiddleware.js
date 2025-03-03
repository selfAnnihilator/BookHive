const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization); // Debugging
  let token;


  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      console.log("Token:", token); // Debugging
      console.log("Token:", token); // Debugging
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      console.log("Decoded User ID:", decoded.id); // Debugging
      console.log("Decoded User ID:", decoded.id); // Debugging
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
      console.error("No token provided"); // Debugging
      console.error("No token provided"); // Debugging
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
