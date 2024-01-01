# capstone-airtribe
# Chronos: Job Scheduler System

## Background & Objective
In modern computing environments, being able to efficiently schedule, manage, and monitor tasks, also known as jobs, is crucial. These could range from simple tasks like sending a weekly email to more complex operations like processing data or maintaining databases. This project aims to design and implement a robust and scalable backend for a job scheduling system.

## Key Features
1. **Job Submission:** Implement a mechanism for users to submit jobs that can be executed either immediately or at a specific future time. The submitted jobs can be of various types and complexities.
2. **Recurring Jobs:** The system should be capable of handling jobs that recur at specified intervals. This could include hourly, daily, weekly, or monthly tasks.
3. **Job Management:** Create APIs for users to manage their jobs. This should allow them to view the status of their jobs, cancel jobs, and reschedule jobs.

## Project Structure

|-- config
| |-- authConfig.js
| |-- database.js
|-- controllers
| |-- jobController.js
| |-- userController.js
|-- middleware
| |-- authenticationMiddleware.js
|-- models
| |-- jobModel.js
| |-- userModel.js
|-- routes
| |-- jobRoutes.js
| |-- userRoutes.js
|-- app.js
|-- README.md
|-- package.json

bash
Copy code

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chronos-job-scheduler.git
Install dependencies:

bash
Copy code
cd chronos-job-scheduler
npm install
Set up MongoDB:

Install MongoDB on your machine.
Create a new database named chronos_db.
Configure the application:

Update the MongoDB connection string in config/database.js.
Update the JWT secret key in config/authConfig.js.
Start the server:

APIs

User APIs

Create a new user:
POST /users/create

Get information about a specific user:
GET /users/:userID

Update user information:
PUT /users/:userID/update

Delete a specific user:
DELETE /users/:userID/delete

Job APIs

Submit a new job:
POST /jobs/submit

Get information about a specific job:
GET /jobs/:jobID

Cancel a specific job:
DELETE /jobs/:jobID

Reschedule a specific job:
PUT /jobs/:jobID/reschedule

Dependencies
express
mongoose
body-parser
jsonwebtoken
