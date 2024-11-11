const { sql, poolPromise } = require('../../dbConfig');

async function getAvailableSlots(branchID, date) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('BranchID', sql.Int, branchID)
      .input('Date', sql.Date, date)
      .query(`
        SELECT SlotID, 
               FORMAT(ISNULL(CAST(StartTime AS DATETIME), '1900-01-01 00:00:00'), 'HHmm') AS StartTime
        FROM AvailableSlots
        WHERE BranchID = @BranchID
          AND AppointmentDate = @Date
          AND IsBooked = 0;
      `);

    return result.recordset;  // Array of available slots
  } catch (error) {
    console.error("Error fetching available slots:", error.message);
    throw new Error("Error fetching available slots: " + error.message);
  }
}

async function bookSlot(slotID) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('SlotID', sql.Int, slotID)
      .query(`
        UPDATE AvailableSlots
        SET IsBooked = 1
        WHERE SlotID = @SlotID
      `);

    return result.rowsAffected[0] > 0; // Return true if row is affected
  } catch (error) {
    console.error("Error booking slot:", error.message);
    throw new Error("Error booking slot: " + error.message);
  }
}

module.exports = { getAvailableSlots, bookSlot };
