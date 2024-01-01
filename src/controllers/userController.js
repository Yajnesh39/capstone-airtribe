const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');
const generateToken = require('../middleware/authToken');

// Controller to handle user-related operations

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Invalid user data' });
    }

    // Create a new user object using the User model
    const newUser = new User({
      userID: new mongoose.Types.ObjectId(),
      username: req.body.username,
      password: bcryptjs.hashSync(req.body.password, 8),
      // Note: In a production setting, password hashing and encryption should be implemented
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate a JWT token for the new user
    const token = generateToken(savedUser._id);
    
    // Respond with the created user details and token
    res.status(200).json({ user: savedUser, token: token, message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get information about a specific user
exports.getUser = async (req, res) => {
  try {
    const { userID } = req.params;

    // Find the user in the MongoDB database
    const user = await User.findById(userID);

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update user information
exports.updateUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const { username, password } = req.body;

    // Update user information in the MongoDB database
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { username, password }, // Update the fields you want to change
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({ user: updatedUser, message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a specific user
exports.deleteUser = async (req, res) => {
  try {
    const { userID } = req.params;

    // Remove user from the MongoDB database
    const result = await User.findByIdAndDelete(userID);

    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
