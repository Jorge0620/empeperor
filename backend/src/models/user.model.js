const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    withdrawable: {
      type: Number,
      default: 0
      // unique: true,
    },
    accumulatedReferral: {
      type: Number,
      required: true,
      default: 0
      // unique: true,
    },
    totalDeposit: {
      type: Number,
      default: 0
      // unique: true,
    },
    rank: {
      type: Number,
      required: true,
      default: 0
      // unique: true,
    },
    refCode: {
      type: String,
      trim: true,
      default: ""
    },
    paidForRefer: {
      type: Boolean,
      default: false
    },
    referrer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
