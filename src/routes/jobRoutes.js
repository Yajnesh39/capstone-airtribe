const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticateUser } = require('../middleware/authenticationMiddleware');

// Routes for job-related operations

// Submit a new job
router.post('/submit', authenticateUser, jobController.submitJob);

// Get information about a specific job
router.get('/:jobID', authenticateUser, jobController.getJob);

// Cancel a specific job
router.delete('/:jobID', authenticateUser, jobController.cancelJob);

// Reschedule a specific job
router.put('/:jobID/reschedule', authenticateUser, jobController.rescheduleJob);

module.exports = router;