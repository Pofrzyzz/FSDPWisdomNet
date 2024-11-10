const express = require('express');
const cors = require('cors');
const { saveContact } = require('./controllers/contactController');
const { fetchBranches } = require('./controllers/branchController');
const { getAvailableSlots, bookSlot } = require('./controllers/availableController');
const appointmentController = require('./controllers/appointmentController'); 
const { validateAppointment } = require('./middlewares/validateAppointment');
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

// Route to get available slots by branch and date
app.get('/api/available-slots', appointmentController.getAvailableSlots);
  
// Route to create an appointment
app.post('/api/create', validateAppointment, appointmentController.createAppointment);

// Route for booking a slot with date validation middleware
app.post('/api/slots/book', bookSlot);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
