const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Correctly link routes to controller functions
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
