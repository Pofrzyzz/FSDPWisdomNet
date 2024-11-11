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

// Define routes directly
app.get('/api/branch', branchController.fetchBranches);
app.post('/api/contact', contactController.saveContact);
app.get('/api/slots/available', validateDate.validateDate, availableController.getAvailableSlots);
app.post('/api/slots/book', availableController.bookSlot);
app.get('/api/available-slots', appointmentController.getAvailableSlots);
app.post('/api/create', validateAppointment.validateAppointment, appointmentController.createAppointment);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
