const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const connectToDatabase = require('../config/database');

const app = express();
const port = process.env.PORT || 3000;

// Connect to the MongoDB database
connectToDatabase()
  .then(() => {
    app.use(bodyParser.json());

    // Routes
    app.use('/users', userRoutes);
    app.use('/jobs', jobRoutes);

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error starting the server:', error);
  });