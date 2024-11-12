// src/middlewares/validateAppointment.js

// Middleware to validate the appointment data
function validateAppointment(req, res, next) {
  const { branchID, fullName, email, reason, appointmentDate, appointmentTime, slotID } = req.body;

  // Check if all required fields are provided
  if (!branchID || !fullName || !email || !reason || !appointmentDate || !appointmentTime || !slotID) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate email format
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Validate date format (YYYY-MM-DD) and ensure date is in the future
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(appointmentDate)) {
    return res.status(400).json({ error: 'Invalid date format. Expected format: YYYY-MM-DD' });
  }

  const today = new Date();
  const appointmentDateObj = new Date(appointmentDate);

  // Ensure the appointment date is in the future
  if (appointmentDateObj < today) {
    return res.status(400).json({ error: 'Appointment date must be in the future' });
  }

  // Validate time format (HH:MM)
  const timePattern = /^\d{2}:\d{2}$/;
  if (!timePattern.test(appointmentTime)) {
    return res.status(400).json({ error: 'Invalid time format. Expected format: HH:MM' });
  }

  // Validate slotID as a number
  if (isNaN(slotID) || slotID <= 0) {
    return res.status(400).json({ error: 'Invalid slotID' });
  }

  next(); // Move to the next middleware or route handler
}

module.exports = { validateAppointment };
