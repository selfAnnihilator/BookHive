import mongoose from 'mongoose';

const groupMemberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  role: {
    type: String,
    enum: ['member', 'moderator', 'admin'],
    default: 'member'
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
});

// Ensure unique combination of user and group
groupMemberSchema.index({ user: 1, group: 1 }, { unique: true });

export default mongoose.model('GroupMember', groupMemberSchema);
