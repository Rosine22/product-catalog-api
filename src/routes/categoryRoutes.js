const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware.js');

// Admin-only routes
router.post('/', authMiddleware, isAdmin, categoryController.createCategory);
router.put('/:id', authMiddleware, isAdmin, categoryController.updateCategory);
router.delete('/:id', authMiddleware, isAdmin, categoryController.deleteCategory);

// Routes accessible to all authenticated users
router.get('/', authMiddleware, categoryController.getCategories);
router.get('/:id', authMiddleware, categoryController.getCategoryById);

module.exports = router;