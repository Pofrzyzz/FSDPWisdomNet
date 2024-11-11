const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const setupSocket = require('./socket');
const contactController = require('./controllers/contactController');
const branchController = require('./controllers/branchController');
const availableController = require('./controllers/availableController');
const appointmentController = require('./controllers/appointmentController');
const validateAppointment = require('./middlewares/validateAppointment');
const validateDate = require('./middlewares/validateDate');

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Set up Socket.io events
setupSocket(io);

// Define API routes
app.get('/api/branch', branchController.fetchBranches); // Route to get all branches
app.post('/api/contact', contactController.saveContact); // Route to save contact info

// Routes for available slots
app.get('/api/available', validateDate, availableController.getAvailableSlots); // Get available slots, with date validation
app.post('/api/slots/book', availableController.bookSlot); // Book a slot

// Routes for appointments
app.get('/api/appointment/available-slots', appointmentController.getAvailableSlots); // Get available slots by branch and date
app.post('/api/appointment/create', validateAppointment, appointmentController.createAppointment); // Create an appointment with validation

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
