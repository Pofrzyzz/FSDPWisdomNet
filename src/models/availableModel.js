const { sql, poolPromise } = require('../../dbConfig');

async function getAvailableSlots(branchID, date) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('BranchID', sql.Int, branchID)
      .input('Date', sql.Date, date) 
      .query(`
        SELECT SlotID, StartTime, EndTime
        FROM AvailableSlots
        WHERE BranchID = @BranchID
          AND AppointmentDate = @Date
          AND IsBooked = 0  -- Only available slots
      `);

    return result.recordset;  
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

    return result.rowsAffected[0] > 0;
  } catch (error) {
    console.error("Error booking slot:", error.message);
    throw new Error("Error booking slot: " + error.message);
  }
}

module.exports = { getAvailableSlots, bookSlot };