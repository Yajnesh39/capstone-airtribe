const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authenticationMiddleware');

// Routes for user-related operations

// Create a new user
router.post('/create', userController.createUser);

// Get information about a specific user
router.get('/:userID', authenticateUser, userController.getUser);

// Update user information
router.put('/:userID/update', authenticateUser, userController.updateUser);

// Delete a specific user
router.delete('/:userID/delete', authenticateUser, userController.deleteUser);

module.exports = router;