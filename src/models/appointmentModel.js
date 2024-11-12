const {sql} = require('../../dbConfig'); // Assuming you're using mssql

// Get available slots for a branch and date
async function getAvailableSlots(branchID, appointmentDate) {
  try {
    const query = `
      SELECT 
        SlotID, 
        CONVERT(VARCHAR(5), StartTime, 108) AS StartTime,   -- Format StartTime as HH:MM
        CONVERT(VARCHAR(5), EndTime, 108) AS EndTime        -- Format EndTime as HH:MM
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
}

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

async function createAppointment(data) {
  const { BranchID, FullName, Email, Reason, AppointmentDate, AppointmentTime, SlotID } = data;

  try {
      // Start a transaction
      const transaction = new sql.Transaction();
      await transaction.begin();

      // Check if the slot is available
      const checkSlotQuery = `
          SELECT IsBooked 
          FROM AvailableSlots 
          WHERE SlotID = @SlotID AND BranchID = @BranchID AND AppointmentDate = @AppointmentDate
      `;
      const slotResult = await transaction.request()
          .input('SlotID', sql.Int, SlotID)
          .input('BranchID', sql.Int, BranchID)
          .input('AppointmentDate', sql.Date, AppointmentDate)
          .query(checkSlotQuery);

      // If slot is not available, return an error
      if (slotResult.recordset[0]?.IsBooked) {
          await transaction.rollback();
          return { error: 'Selected time slot is already booked' };
      }

      // Insert appointment record
      const insertAppointmentQuery = `
          INSERT INTO Appointment (BranchID, FullName, Email, Reason, AppointmentDate, AppointmentTime, SlotID)
          VALUES (@BranchID, @FullName, @Email, @Reason, @AppointmentDate, @AppointmentTime, @SlotID)
      `;
      await transaction.request()
          .input('BranchID', sql.Int, BranchID)
          .input('FullName', sql.NVarChar(100), FullName)
          .input('Email', sql.NVarChar(100), Email)
          .input('Reason', sql.NVarChar(255), Reason)
          .input('AppointmentDate', sql.Date, AppointmentDate)
          .input('AppointmentTime', sql.Time, AppointmentTime) // Added AppointmentTime here
          .input('SlotID', sql.Int, SlotID)
          .query(insertAppointmentQuery);

      // Update the slot to mark it as booked
      const updateSlotQuery = `
          UPDATE AvailableSlots 
          SET IsBooked = 1 
          WHERE SlotID = @SlotID
      `;
      await transaction.request()
          .input('SlotID', sql.Int, SlotID)
          .query(updateSlotQuery);

      // Commit the transaction
      await transaction.commit();

      return { success: 'Appointment created successfully' };

  } catch (error) {
      // Rollback in case of an error
      if (transaction.inTransaction) await transaction.rollback();
      return { error: error.message };
  }
}

module.exports = { getAvailableSlots, getSlotById, createAppointment };
