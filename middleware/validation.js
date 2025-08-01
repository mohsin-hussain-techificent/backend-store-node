const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);


  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

const validateProduct = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Product name must be between 2 and 255 characters'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  

  
  body('imageUrl')
    .trim()
    .notEmpty()
    .withMessage('Image Data is required')
    // .matches(/^data:image\/[a-zA-Z]+;base64,([A-Za-z0-9+/=]+)$/)
    // .withMessage('Image data must be a valid base64 string'),
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  
  body('externalUrl')
    .trim()
    .notEmpty()
    .withMessage('External URL is required')
    .isURL()
    .withMessage('External URL must be a valid URL'),
  
  body('categoryId')
    .notEmpty()
    .withMessage('Category ID is required')
    .isUUID()
    .withMessage('Category ID must be a valid UUID'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description must not exceed 2000 characters'),
  

  
  handleValidationErrors
];

const validateCategory = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Category name must be between 2 and 100 characters'),
  

  
  handleValidationErrors
];

module.exports = {
  validateProduct,
  validateCategory,
  handleValidationErrors
};