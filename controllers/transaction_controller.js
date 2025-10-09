const Transaction = require('../models/transactions_model');

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({}).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndUpdate(id, req.body);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    const updatedTransaction = await Transaction.findById(id);
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndDelete(id, req.body);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(204).json({ message: 'successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTransactions,
  getTransaction,
  updateTransaction,
  createTransaction,
  deleteTransaction,
};
