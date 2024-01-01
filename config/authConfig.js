const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

// Function to generate a JWT token
const generateToken = (userID) => {
  const payload = { userID };
  const options = { expiresIn: '1h' }; 

  // Sign the token with the secret key
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

// Function to verify a JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

module.exports = { generateToken, verifyToken };