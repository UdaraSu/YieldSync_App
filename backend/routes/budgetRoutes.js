const express = require('express');
const { createBudget, getAllBudgets, updateBudget, deleteBudget } = require('../controllers/budgetController');
const router = express.Router();

// Create a new budget
router.post('/create', async (req, res) => {
  const { category, budgetAmount } = req.body;
  
  // Validation
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
});

// Get all budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update budget
router.put('/update/:id', async (req, res) => {
  const { category, budgetAmount } = req.body;

  // Validation
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
});

// Delete budget
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
    
    if (!deletedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
