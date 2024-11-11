const appointmentModel = require('../models/appointmentModel');

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

const createAppointment = async (req, res) => {
    const { branchID, fullName, email, reason, appointmentDate, appointmentTime, slotID } = req.body;

    if (!branchID || !fullName || !email || !reason || !appointmentDate || !appointmentTime || !slotID) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const result = await appointmentModel.createAppointment(branchID, fullName, email, reason, appointmentDate, appointmentTime);
        await appointmentModel.bookSlot(slotID);

        res.status(200).json({
            message: 'Appointment created successfully',
            appointmentID: result.insertId,
        });
    } catch (err) {
        console.error("Error creating appointment:", err.message);
        res.status(500).json({ error: 'Error creating appointment' });
    }
};

module.exports = { getAvailableSlots, createAppointment };
