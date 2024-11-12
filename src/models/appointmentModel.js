const {sql} = require('../../dbConfig'); // Assuming you're using mssql

// Get available slots for a branch and date
async function getAvailableSlots(branchID, appointmentDate) {
  try {
    const query = `
      SELECT SlotID, StartTime, EndTime
      FROM AvailableSlots
      WHERE BranchID = @BranchID AND AppointmentDate = @AppointmentDate AND IsBooked = 0;
    `;
    const result = await sql.query(query, { 
      BranchID: branchID, 
      AppointmentDate: appointmentDate
    });
    return result.recordset;  // Returning the available slots
  } catch (err) {
    throw new Error('Error fetching available slots: ' + err.message);
  }
};

// Get a specific slot by its ID
async function getSlotById(slotID) {
  try {
      const query = `
          SELECT SlotID, BranchID, AppointmentDate, StartTime, EndTime, IsBooked
          FROM AvailableSlots
          WHERE SlotID = @SlotID;
      `;
      const result = await sql.query(query, { SlotID: slotID });
      
      if (result.recordset.length === 0) {
          return null; 
      }

      return result.recordset[0];
  } catch (err) {
      console.error("Error in getSlotById:", err.message);
      throw new Error("Error fetching slot details");
  }
}

// Create a new appointment
async function createAppointment(branchID, fullName, email, reason, appointmentDate, appointmentTime, slotID) {
  try {
    const query = `
      INSERT INTO Appointment (BranchID, FullName, Email, Reason, AppointmentDate, AppointmentTime, SlotID)
      VALUES (@BranchID, @FullName, @Email, @Reason, @AppointmentDate, @AppointmentTime, @SlotID);
      SELECT SCOPE_IDENTITY() AS AppointmentID;  -- Get the AppointmentID of the newly created record
    `;
    
    const result = await sql.query(query, { 
      BranchID: branchID, 
      FullName: fullName, 
      Email: email, 
      Reason: reason, 
      AppointmentDate: appointmentDate, 
      AppointmentTime: appointmentTime,
      SlotID: slotID
    });

    // Returning the AppointmentID of the newly inserted record
    return result.recordset[0].AppointmentID;
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
      WHERE SlotID = @SlotID;
    `;
    await sql.query(query, { SlotID: slotID });
  } catch (err) {
    throw new Error('Error booking slot: ' + err.message);
  }
}

module.exports = { getAvailableSlots, getSlotById, createAppointment, bookSlot };
