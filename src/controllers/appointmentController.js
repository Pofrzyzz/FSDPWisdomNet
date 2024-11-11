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

// Create an appointment and book the slot
const createAppointment = async (req, res) => {
    const { branchID, fullName, email, reason, appointmentDate, appointmentTime, slotID } = req.body;

    // Validate required fields
    if (!branchID || !fullName || !email || !reason || !appointmentDate || !appointmentTime || !slotID) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if the slot is available
        const slot = await appointmentModel.getSlotById(slotID);

        if (!slot) {
            return res.status(404).json({ message: "Slot not found" });
        }

        if (slot.IsBooked === 1) {
            return res.status(400).json({ message: "The selected slot is already booked" });
        }

        // Create the appointment
        const appointmentID = await appointmentModel.createAppointment(branchID, fullName, email, reason, appointmentDate, appointmentTime, slotID);

        // Mark the slot as booked
        await appointmentModel.bookSlot(slotID);

        // Return success response with the AppointmentID
        res.status(201).json({
            message: 'Appointment created successfully',
            appointmentID: appointmentID,  // Return the AppointmentID of the newly created appointment
        });
    } catch (err) {
        console.error("Error creating appointment:", err.message);
        res.status(500).json({ error: 'Error creating appointment' });
    }
};

// Get slot details by SlotID
const getSlotById = async (req, res) => {
    const { slotID } = req.params;  // Expecting SlotID in the URL params

    if (!slotID) {
        return res.status(400).json({ message: "SlotID is required" });  
    }

    try {
        const slot = await appointmentModel.getSlotById(slotID);

        if (!slot) {
            return res.status(404).json({ message: "Slot not found" }); 
        }

        res.status(200).json(slot);
    } catch (err) {
        console.error("Error fetching slot details:", err.message);
        res.status(500).json({ error: "Error fetching slot details" });  
    }
};

module.exports = { getAvailableSlots, createAppointment, getSlotById };
