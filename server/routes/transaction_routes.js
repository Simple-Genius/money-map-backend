const express = require('express');
const router = express.Router();

const {
  getAllTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../../controllers/transaction_controller');

const { protect } = require('../../controllers/auth_controller');

router.route('/').get(getAllTransactions).post(createTransaction);

router
  .route('/:id')
  .get(getTransaction)
  .patch(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
