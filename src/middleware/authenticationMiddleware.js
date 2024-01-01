const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to handle user authentication using JWT
exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    const decoded = jwt.verify(token, 'your-secret-key');
    const user = await User.findById(decoded.userID);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
