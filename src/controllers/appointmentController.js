// src/controllers/appointmentController.js
const appointmentModel = require('../models/appointmentModel');

// Get available slots
const getAvailableSlots = async (req, res) => {
  const { branchID, appointmentDate } = req.query;

  // Validate inputs
  if (!branchID || !appointmentDate) {
    return res.status(400).json({ message: "BranchID and Appointment Date are required" });
  }

  try {
    // Fetch available slots from the available model
    const availableSlots = await appointmentModel.getAvailableSlots(branchID, appointmentDate);
    if (availableSlots.length === 0) {
      return res.status(404).json({ message: "No available slots for this date" });
    }

    res.status(200).json(availableSlots); // Return available slots
  } catch (err) {
    console.error("Error fetching available slots:", err.message);
    res.status(500).json({ error: 'Error fetching available slots' });
  }
};

// Create an appointment
const createAppointment = async (req, res) => {
  const { branchID, fullName, email, reason, appointmentDate, appointmentTime, slotID } = req.body;

  // Validate inputs
  if (!branchID || !fullName || !email || !reason || !appointmentDate || !appointmentTime || !slotID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Step 1: Create the appointment in the database
    const result = await appointmentModel.createAppointment(branchID, fullName, email, reason, appointmentDate, appointmentTime);

    // Step 2: Mark the slot as booked
    await appointmentModel.bookSlot(slotID);

    res.status(200).json({
      message: 'Appointment created successfully',
      appointmentID: result.insertId, // Send back the created appointment ID
    });
  } catch (err) {
    console.error("Error creating appointment:", err.message);
    res.status(500).json({ error: 'Error creating appointment' });
  }
};

// Export the functions using shorthand syntax
module.exports = { getAvailableSlots, createAppointment };
