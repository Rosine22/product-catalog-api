const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware.js');

// Admin-only routes
router.post('/', authMiddleware, isAdmin, productController.createProduct);
router.put('/:id', authMiddleware, isAdmin, productController.updateProduct);
router.delete('/:id', authMiddleware, isAdmin, productController.deleteProduct);

// Routes accessible to all authenticated users
router.get('/', authMiddleware, productController.getProducts);

module.exports = router;