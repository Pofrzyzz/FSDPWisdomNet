const appointmentModel = require('../models/appointmentModel');

// Get available slots for a branch and date
const getAvailableSlots = async (req, res) => {
    const { branchID, appointmentDate } = req.query;

    if (!branchID || !appointmentDate) {
        return res.status(400).json({ message: "BranchID and Appointment Date are required" });
    }

    try {
        const availableSlots = await appointmentModel.getAvailableSlots(branchID, appointmentDate);
        if (availableSlots.length === 0) {
            return res.status(404).json({ message: "No available slots for this date" });
        }
        res.status(200).json(availableSlots);
    } catch (err) {
        console.error("Error fetching available slots:", err.message);
        res.status(500).json({ error: 'Error fetching available slots' });
    }
};


// Get slot details by SlotID
async function createAppointment(req, res) {
    const { BranchID, FullName, Email, Reason, AppointmentDate, AppointmentTime, SlotID } = req.body;

    // Validate input
    if (!BranchID || !FullName || !Email || !AppointmentDate || !AppointmentTime || !SlotID) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Call the model to create an appointment
        const result = await createAppointment({ BranchID, FullName, Email, Reason, AppointmentDate, AppointmentTime, SlotID });

        // Check for any errors from the model
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        // Send success response
        return res.status(201).json({ message: result.success });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getAvailableSlots, createAppointment };
