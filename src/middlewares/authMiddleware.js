const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Use the same secret as in authRoutes
const JWT_SECRET = 'mysecretkey'; // Replace with environment variable in production

// Authentication middleware
const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await User.findById(decoded.user.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Authorization middleware for admin role
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

module.exports = { authMiddleware, isAdmin };