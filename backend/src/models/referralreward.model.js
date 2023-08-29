const mongoose = require('mongoose');
const ReferralrewardSchema = mongoose.Schema(
  {
    referrerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
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
    cashback: {
      type: Number,
      required: true,
      default: 5
    }, 
    paid: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const Referralreward = mongoose.model('Referralreward', ReferralrewardSchema);

module.exports = Referralreward;
