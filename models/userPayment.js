const mongoose = require("mongoose");

// rent car upload model schema

const userPaymentScheama = new mongoose.Schema(
  {
    userId: {
      type: String,
      trim: true,
    },

    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    payAmonut: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userPayment", userPaymentScheama);
