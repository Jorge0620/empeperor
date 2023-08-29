const mongoose = require('mongoose');
const withdrawSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      // unique: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Withdraw
 */
const Withdraw = mongoose.model('Withdraw', withdrawSchema);

module.exports = Withdraw;
