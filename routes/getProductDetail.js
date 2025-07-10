const express = require('express');
const router = express.Router();

const getProductDetail = require('../controllers/productDetailController');

// This attaches the function to a route
router.get('/', getProductDetail);

// ✅ Export the router itself
module.exports = router;
