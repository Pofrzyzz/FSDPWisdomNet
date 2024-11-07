// src/controllers/contactController.js
const { addContact } = require('../models/contactModel');

const saveContact = async (req, res) => {
  const { mobileNumber, selectedProblem } = req.body;

  try {
    const queueNumber = await addContact(mobileNumber, selectedProblem);
    console.log("Queue Number returned from addContact:", queueNumber);

    res.status(200).json({
      message: 'Contact information saved successfully.',
      queueNumber: queueNumber,
    });
  } catch (error) {
    console.error("Error in saveContact function:", error.message);
    res.status(500).json({ error: 'Failed to save contact information.' });
  }
};

module.exports = { saveContact };






