const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
    },
    amount: {
      type: Number,
      required: [true],
      default: 0,
    },
    debit: Boolean,
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
