const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

// Function to generate a JWT token
const generateToken = (userID) => {
  const payload = { userID };
  const options = { expiresIn: '1h' };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

module.exports = generateToken;