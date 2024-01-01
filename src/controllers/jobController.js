const mongoose = require('mongoose');
const Job = require('../models/jobModel');

// Controller to handle job-related operations

// Submit a new job
exports.submitJob = async (req, res) => {
  try {
    const { userID, jobType, jobDetails } = req.body;

    // Validation
    if (!userID || !jobType || !jobDetails) {
      return res.status(400).json({ message: 'Invalid job data' });
    }

    // Create a new job object using the Job model
    const newJob = new Job({
      jobID: new mongoose.Types.ObjectId(),
      userID,
      jobType,
      jobDetails,
      status: 'pending',
      timestamp: new Date(),
    });

    // Save the job to the MongoDB database
    await newJob.save();

    // Return the created job
    res.status(200).json({ job: newJob, message: 'Job submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get information about a specific job
exports.getJob = async (req, res) => {
  try {
    const { jobID } = req.params;

    // Find the job in the MongoDB database
    const job = await Job.findById(jobID);

    if (job) {
      res.status(200).json({ job });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Cancel a specific job
exports.cancelJob = async (req, res) => {
  try {
    const { jobID } = req.params;

    // Remove job from the MongoDB database
    const result = await Job.findByIdAndDelete(jobID);

    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Reschedule a specific job
exports.rescheduleJob = async (req, res) => {
  try {
    const { jobID } = req.params;
    const { newSchedule } = req.body;

    // Update job schedule in the MongoDB database
    const updatedJob = await Job.findByIdAndUpdate(
      jobID,
      { schedule: newSchedule },
      { new: true }
    );

    if (updatedJob) {
      res.status(200).json({ job: updatedJob, message: 'Job rescheduled successfully' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};