const Expense = require('../models/Expense');
const mongoose = require('mongoose');

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Public
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a new expense
// @route   POST /api/expenses/create
// @access  Public
const createExpense = async (req, res) => {
  const { date, category, amount, description } = req.body;

  try {
    let newExpense = new Expense({
      date,
      category,
      amount,
      description,
    });

    await newExpense.save();
    res.json(newExpense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update an expense
// @route   PUT /api/expenses/update/:id
// @access  Public
const updateExpense = async (req, res) => {
  const { date, category, amount, description } = req.body;

  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ msg: 'Expense not found' });
    }

    expense.date = date;
    expense.category = category;
    expense.amount = amount;
    expense.description = description;

    await expense.save();
    res.json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/delete/:id
// @access  Public
const deleteExpense = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid expense ID' });
  }

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ msg: 'Expense not found' });
    }

    // Use deleteOne() instead of remove()
    await Expense.deleteOne({ _id: id });

    res.json({ msg: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
