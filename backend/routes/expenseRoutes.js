const express = require('express');
const router = express.Router();
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');

// Get all expenses
router.get('/', getExpenses);

// Create a new expense
router.post('/create', createExpense);

// Update an expense by ID
router.put('/update/:id', updateExpense);

// Delete an expense by ID
router.delete('/delete/:id', deleteExpense);

module.exports = router;
