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
const loginController = require('./controllers/loginController');
const signupController = require('./controllers/signupController');
const historyController = require('./controllers/historyController');
const { decreaseQueueNumber } = require('./controllers/inQueueController'); // Import the function
const axios = require('axios'); // For making API calls to Flask

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT'] // Allow PUT requests
  }
});

// Set up Socket.io events
setupSocket(io);

// Route for login/sign up user
app.post('/api/users/login', loginController.loginUser);
app.post('/api/users/signup', signupController.signUpUser);

// AI Chatbot (aichatbot) Socket.io Namespace
const aiChatbotNamespace = io.of('/aichatbot');

aiChatbotNamespace.on('connection', (socket) => {
  console.log(`AI Chatbot user connected: ${socket.id}`);

  socket.on('chat_message', async (message) => {
    console.log(`AI Chatbot message received: ${message}`);

    try {
      const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
        sender: socket.id, // Use the socket ID as the sender ID for unique tracking
        message: message,
      });

      const botReplies = response.data.map((reply) => reply.text).join('\n');

      socket.emit('chat_reply', botReplies);
    } catch (error) {
      console.error('Error communicating with Rasa backend:', error.message);
      socket.emit('chat_reply', 'Sorry, something went wrong. Please try again.');
    }
  });

  socket.on('disconnect', () => {
    console.log(`AI Chatbot user disconnected: ${socket.id}`);
  });
});

// Define API routes
app.get('/api/branch', branchController.fetchBranches); // Route to get all branches
app.post('/api/contact', contactController.saveContact); // Route to save contact info

// PUT route for reducing queue number instead of deleting the user
app.put('/api/contact/reduce-queue', decreaseQueueNumber);

// Routes for available slots
app.get('/api/slots/available', validateDate.validateDate, availableController.getAvailableSlots); // Get available slots, with date validation
app.post('/api/slots/book', availableController.bookSlot); // Book a slot

// Routes for appointments
app.post('/api/appointment/create', validateAppointment.validateAppointment, appointmentController.createAppointment); // Create an appointment with validation

// Routes for history
app.get('/api/history/:userId', historyController.getBookingHistory);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

