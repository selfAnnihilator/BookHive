const mongoose = require('mongoose');

const bookClubSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  users: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BookClub = mongoose.model('BookClub', bookClubSchema);

module.exports = BookClub;
