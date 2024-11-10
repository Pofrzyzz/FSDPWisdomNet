const { getAvailableSlots, bookSlot } = require('../models/availableModel');

// Get available slots for a specific branch and date
exports.getAvailableSlots = async (req, res) => {
  const { branchID, date } = req.query;

  if (!branchID || !date) {
    return res.status(400).json({ message: "BranchID and Date are required" });
  }

  try {
    const slots = await getAvailableSlots(branchID, date);

    if (slots.length === 0) {
      return res.status(404).json({ message: "No available slots for this date" });
    }

    res.json(slots);
  } catch (error) {
    console.error("Error fetching available slots:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Book a slot by slotID
exports.bookSlot = async (req, res) => {
  const { slotID } = req.body;

  if (!slotID) {
    return res.status(400).json({ message: "SlotID is required" });
  }

  try {
    const success = await bookSlot(slotID);

    if (success) {
      res.status(200).json({ message: "Slot successfully booked" });
    } else {
      res.status(404).json({ message: "Slot not found or already booked" });
    }
  } catch (error) {
    console.error("Error booking slot:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};