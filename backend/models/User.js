const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 190,
    },
    password_hash: {
      type: String,
      required: true,
      maxlength: 255,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
