const moment = require('moment');

// Middleware to validate if the date is today or in the future
function validateDate(req, res, next) {
  const { date } = req.query || req.body;  // Date can come from query or body, depending on the request

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  const today = moment().startOf('day'); // Get today at 00:00
  const selectedDate = moment(date);

  if (selectedDate.isBefore(today)) {
    return res.status(400).json({ message: "Date cannot be in the past" });
  }

  next();  // Proceed to the next middleware or route handler
}

module.exports = validateDate;