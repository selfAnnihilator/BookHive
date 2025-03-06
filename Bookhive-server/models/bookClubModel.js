const mongoose = require('mongoose');

const bookClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const BookClub = mongoose.model('BookClub', bookClubSchema);

module.exports = BookClub;
