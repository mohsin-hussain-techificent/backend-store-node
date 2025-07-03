const express = require('express');
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');
const { validateCategory } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.get('/', getCategories);

// Protected routes (admin only)
router.post('/', protect, validateCategory, createCategory);
router.put('/:id', protect, validateCategory, updateCategory);
router.delete('/:id', protect, deleteCategory);

module.exports = router;