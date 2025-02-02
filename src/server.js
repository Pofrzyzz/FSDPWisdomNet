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
const operatorLoginController = require('./controllers/operatorLoginController');
const { decreaseQueueNumber } = require('./controllers/inQueueController'); 
const axios = require('axios');
const { poolPromise } = require('../dbConfig'); // Import SQL Connection Pool

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT'] 
  }
});

// Set up Socket.io events
setupSocket(io);

// Route for login/sign up user
app.post('/api/users/login', loginController.loginUser);
app.post('/api/users/signup', signupController.signUpUser);

// Operator login route
app.post('/api/operators/login', operatorLoginController.loginOperator);

// AI Chatbot (aichatbot) Socket.io Namespace
const aiChatbotNamespace = io.of('/aichatbot');

aiChatbotNamespace.on('connection', (socket) => {
  console.log(`AI Chatbot user connected: ${socket.id}`);

  socket.on('chat_message', async (message) => {
    console.log(`AI Chatbot message received: ${message}`);

    try {
      const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
        sender: socket.id,
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
app.get('/api/branch', branchController.fetchBranches);
app.post('/api/contact', contactController.saveContact);

// PUT route for reducing queue number instead of deleting the user
app.put('/api/contact/reduce-queue', decreaseQueueNumber);

// Routes for available slots
app.get('/api/slots/available', validateDate.validateDate, availableController.getAvailableSlots);
app.post('/api/slots/book', availableController.bookSlot);

// Routes for appointments
app.post('/api/appointment/create', validateAppointment.validateAppointment, appointmentController.createAppointment);

// Routes for history
app.get('/api/history/:userId', historyController.getBookingHistory);

const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// 🔹 Gracefully handle server shutdown
const shutdownServer = async () => {
  console.log("\n🔴 Initiating graceful shutdown...");

  try {
    // Stop accepting new connections
    server.close(async () => {
      console.log("🚫 Server stopped accepting new requests.");

      try {
        const pool = await poolPromise;
        console.log("🔄 Closing database connection...");
        await pool.close(); // Close the SQL connection pool
        console.log("✅ Database connection closed.");
      } catch (dbError) {
        console.error("⚠️ Error closing database connection:", dbError);
      }

      process.exit(0); // Ensure the process exits
    });
  } catch (error) {
    console.error("⚠️ Error shutting down server:", error);
    process.exit(1); // Exit with failure status
  }
};

// 🔹 Handle process termination signals
process.on('SIGINT', shutdownServer); // Handle Ctrl+C
process.on('SIGTERM', shutdownServer); // Handle termination signal (Docker, Heroku)
