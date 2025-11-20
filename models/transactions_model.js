const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please enter transaction name'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: categoriesList,
    },
    amount: {
      type: Number,
      required: [true, 'Please enter amount'],
      default: 0,
      min: [0, 'amount must be positive'],
    },
    debit: Boolean,
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const categoriesList = [
  '🏠 Housing',
  '💸 Rent',
  '🏦 Mortgage payments',
  '🛡️ Home insurance',
  '📑 Property taxes',
  '🛠️ Maintenance and repairs',
  '💡 Utilities',
  '⚡ Electricity',
  '🚰 Water',
  '🔥 Gas',
  '🌐 Internet',
  '📺 Cable',
  '🚗 Transportation',
  '⛽ Fuel',
  '🚌 Public transit costs',
  '🔧 Vehicle maintenance',
  '🅿️ Parking fees',
  '🚙 Car payments',
  '🍽️ Food',
  '🛒 Groceries',
  '🍴 Dining out',
  '🍔 Fast food',
  '🏥 Healthcare',
  '💊 Health insurance premiums',
  '👨‍⚕️ Doctor visits',
  '💊 Prescriptions',
  '😁 Dental care',
  '🎉 Entertainment',
  '🎬 Cinema',
  '🎵 Concerts',
  '🏟️ Sporting events',
  '📚 Books',
  '🎨 Hobbies',
  '💰 Savings and investments',
  '🏦 Savings account deposits',
  '👴 Retirement contributions',
  '📈 Investment purchases',
  '🎓 Education',
  '💵 Tuition',
  '✏️ School supplies',
  '🎓 Student loans',
  '💻 Online courses',
];

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
