const Budget = require('../models/Budget');

// Create a new budget
const createBudget = async (req, res) => {
  const { category, budgetAmount } = req.body;

  if (!category || !budgetAmount) {
    return res.status(400).json({ message: 'Category and Budget Amount are required' });
  }

  try {
    const newBudget = new Budget({ category, budgetAmount });
    await newBudget.save();
    res.status(201).json({ message: 'Budget created successfully', budget: newBudget });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all budgets
const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a budget
const updateBudget = async (req, res) => {
  const { category, budgetAmount } = req.body;

  if (!category || !budgetAmount) {
    return res.status(400).json({ message: 'Category and Budget Amount are required' });
  }

  try {
    const updatedBudget = await Budget.findByIdAndUpdate(
      req.params.id,
      { category, budgetAmount },
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json({ message: 'Budget updated successfully', budget: updatedBudget });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a budget
const deleteBudget = async (req, res) => {
  try {
    const deletedBudget = await Budget.findByIdAndDelete(req.params.id);

    if (!deletedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { createBudget, getAllBudgets, updateBudget, deleteBudget };
