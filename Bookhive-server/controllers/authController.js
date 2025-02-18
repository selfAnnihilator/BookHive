const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Otp = require('../models/Otp');
const { sendEmail } = require('../config/email');
const crypto = require('crypto');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, gender } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    
    // Save OTP to database
    const savedOtp = await Otp.create({ email, otp });
    console.log('OTP saved to database:', {
      email: savedOtp.email,
      otp: savedOtp.otp,
      createdAt: savedOtp.createdAt
    });

    // Send OTP via email
    await sendEmail(email, 'BookHive Verification Code', 
      `Your verification code is: ${otp}\n\nThis code will expire in 5 minutes.`);

    res.status(200).json({
      message: 'OTP sent to your email',
      email,
      tempToken: generateToken({ email }, '10m') // Temporary token for verification
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ 
      message: 'Invalid user data',
      error: error.message 
    });
  }
};

// @desc    Authenticate user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid login data' });
  }
};

// Generate JWT with optional expiration
const generateToken = (userId, expiresIn = '30d') => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn
  });
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res) => {
  const { email, otp, userData } = req.body;
  console.log('OTP Verification Request:', { email, otp });

  try {
    // Validate required fields
    if (!userData || !userData.firstName || !userData.lastName || 
        !userData.email || !userData.password || !userData.gender) {
      return res.status(400).json({ message: 'Missing required user data' });
    }

    // Find the OTP record
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      console.log('Invalid OTP for email:', email);
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if OTP is expired
    if (otpRecord.createdAt < Date.now() - 5 * 60 * 1000) {
      console.log('Expired OTP for email:', email);
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Create user with validated data
    console.log('Creating user with data:', userData);
    const user = await User.create({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      gender: userData.gender
    });


    if (user) {
      // Delete the used OTP
      await Otp.deleteOne({ _id: otpRecord._id });
      console.log('User created successfully:', user.email);

      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(400).json({ 
      message: 'OTP verification failed',
      error: error.message 
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyOtp
};
