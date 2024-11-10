// src/server.js
const express = require('express');
const cors = require('cors');
const { saveContact } = require('./controllers/contactController');
const { fetchBranches } = require('./controllers/branchController');
const { getAvailableSlots, bookSlot } = require('./controllers/availableController');  
const validateDate = require('./middlewares/validateDate');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Route for getting branches
app.get('/api/branch', fetchBranches);

// Route for posting contact info
app.post('/api/contact', saveContact);

// Route for getting available slots (validate date using middleware)
app.get('/api/slots/available', validateDate, getAvailableSlots);

// Route for booking a slot
app.post('/api/slots/book', bookSlot);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




