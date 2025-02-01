// src/middlewares/validateAppointment.js

function validateAppointment(req, res, next) {
  const { BranchID, UserID, Reason, BookingDateTime, SlotID } = req.body;

  // Check if all required fields are provided
  if (!BranchID || !UserID || !Reason || !BookingDateTime || !SlotID) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  next();
}

module.exports = { validateAppointment };
