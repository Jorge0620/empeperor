const { boolean } = require('joi');
const mongoose = require('mongoose');
const depositSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    withdrawable: {
      type: Boolean,
      required: true,
      default: false
    },
    firstDeposit: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef User
 */
const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;
