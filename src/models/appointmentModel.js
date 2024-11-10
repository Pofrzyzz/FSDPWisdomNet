const db = require('../../dbConfig'); // assuming you have a db connection file

// Get available slots for a branch and date
exports.getAvailableSlots = async (branchID, appointmentDate) => {
  try {
    const query = `
      SELECT SlotID, StartTime, EndTime
      FROM AvailableSlots
      WHERE BranchID = ? AND AppointmentDate = ? AND IsBooked = 0;
    `;
    const result = await db.query(query, [branchID, appointmentDate]);
    return result;
  } catch (err) {
    throw new Error('Error fetching available slots: ' + err.message);
  }
};

// Create a new appointment
exports.createAppointment = async (branchID, fullName, email, reason, appointmentDate, appointmentTime) => {
  try {
    const query = `
      INSERT INTO Appointment (BranchID, FullName, Email, Reason, AppointmentDate, AppointmentTime)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const result = await db.query(query, [branchID, fullName, email, reason, appointmentDate, appointmentTime]);
    return result;
  } catch (err) {
    throw new Error('Error creating appointment: ' + err.message);
  }
};

// Mark a slot as booked
exports.bookSlot = async (slotID) => {
  try {
    const query = `
      UPDATE AvailableSlots
      SET IsBooked = 1
      WHERE SlotID = ?;
    `;
    await db.query(query, [slotID]);
  } catch (err) {
    throw new Error('Error booking slot: ' + err.message);
  }
};
