const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Admin = require('../models/adminModel'); // Import the Admin model

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // [FIXED]
      // Check the role from the token to decide which model to query
      if (decoded.role === 'admin' && decoded.id) {
        // If it's an admin, find them in the Admin collection
        req.user = await Admin.findById(decoded.id).select('-password');
      } else if (decoded.id) {
        // If it's a regular user, find them in the User collection
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        // Handle old hardcoded token (if you ever need it) or invalid tokens
        throw new Error('Token payload is invalid');
      }

      // If no user was found with that ID in the correct collection
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  // This function is now correct
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as admin' });
  }
};

module.exports = { protect, admin };