const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
      trim: true,
      // index: true,
    },
    gymId: {
      type: Number,
      unique: true,
      required: true,
    },
    address: {
      type: String,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    joinDate: {
      type: Date,
      default: Date.now(),
    },
    validity: {
      type: Date,
      default: Date.now(),
    },
    active: {
      type: Boolean,
      default: false,
    },
    planName: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Customer', customerSchema)
