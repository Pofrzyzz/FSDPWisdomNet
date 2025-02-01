const appointmentModel = require('../models/appointmentModel');

async function createAppointment(req, res) {
    const { BranchID, UserID, Reason, BookingDateTime, SlotID } = req.body;

    // Validate input
    if (!BranchID || !UserID || !Reason || !BookingDateTime || !SlotID) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Call the model to create an appointment
        const result = await appointmentModel.createAppointment(BranchID, UserID, Reason, BookingDateTime, SlotID);

        // Check for any errors from the model
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        // Send success response
        return res.status(201).json({ message: "Appointment created successfully" });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { createAppointment };
