const express = require('express');
const { registerUser, loginUser, verifyOtp, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware
// const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

router.post('/login', loginUser);


// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and complete registration
// @access  Public
router.post('/verify-otp', verifyOtp);

router.get('/profile', protect, getProfile); // Apply protect middleware

module.exports = router;
