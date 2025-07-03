const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkUpdateProducts
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const { validateProduct } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes (admin only)
router.post('/', protect, validateProduct, createProduct);
router.put('/:id', protect, validateProduct, updateProduct);
router.delete('/:id', protect, deleteProduct);
router.patch('/bulk-update', protect, bulkUpdateProducts);

module.exports = router;