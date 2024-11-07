// src/server.js
const express = require('express');
const cors = require('cors');
const { saveContact } = require('./controllers/contactController');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Route for posting contact info
app.post('/api/contact', saveContact);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




