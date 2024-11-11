const db = require('../../dbConfig'); // assuming you have a db connection file

// Get available slots for a branch and date
async function getAvailableSlots(branchID, appointmentDate) {
  try {
    const query = `
      SELECT 
        SlotID, 
        CONVERT(VARCHAR(5), StartTime, 108) AS StartTime,   -- Format StartTime as HH:MM
        CONVERT(VARCHAR(5), EndTime, 108) AS EndTime        -- Format EndTime as HH:MM
      FROM AvailableSlots
      WHERE BranchID = ? AND AppointmentDate = ? AND IsBooked = 0;
    `;
    const result = await db.query(query, [branchID, appointmentDate]);
    return result;
  } catch (err) {
    throw new Error('Error fetching available slots: ' + err.message);
  }
}

// Create a new appointment
async function createAppointment(branchID, fullName, email, reason, appointmentDate, appointmentTime) {
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
}

// Mark a slot as booked
async function bookSlot(slotID) {
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
}

// Export all functions together
module.exports = { getAvailableSlots, createAppointment, bookSlot };
