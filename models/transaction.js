const mongoose = require("mongoose");
const validator = require("validator");

const transactionSchema = new mongoose.Schema({
  item: {
    type: String,
    required: [true, "There are no items!"],
  },
  messageID: {
    type: String,
    required: [true, "The messageID has not been sent!"],
  },
  rvmID: {
    type: String,
    required: [true, "The rvmID has not been sent!"],
  },
  totalCount: {
    type: String,
    required: [true, "The totalCount has not been sent!"],
  },
  totalValue: {
    type: String,
    required: [true, "The totalValue has not been sent!"],
  },
  userID: {
    type: String,
    required: [true, "The userID has not been sent!"],
  },
  transactionID:String,
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
