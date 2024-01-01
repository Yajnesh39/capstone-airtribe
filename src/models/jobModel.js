const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobID: { type: String, unique: true, required: true },
  userID: { type: String, required: true },
  jobType: { type: String, required: true },
  jobDetails: { type: String, required: true },
  status: { type: String, default: 'pending' },
  timestamp: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;