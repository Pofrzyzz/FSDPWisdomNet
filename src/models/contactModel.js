// src/models/contactModel.js
const { sql, poolPromise } = require('../../dbConfig');

async function addContact(mobileNumber, selectedProblem) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('MobileNumber', sql.NVarChar(15), mobileNumber)
      .input('SelectedProblem', sql.NVarChar(255), selectedProblem)
      .query(`
        DECLARE @LastQueueNumber INT = (SELECT MAX(QueueNumber) FROM ContactUs);
        DECLARE @NewQueueNumber INT = COALESCE(@LastQueueNumber, 26) + 1;

        INSERT INTO ContactUs (MobileNumber, SelectedProblem, QueueNumber)
        VALUES (@MobileNumber, @SelectedProblem, @NewQueueNumber);

        SELECT @NewQueueNumber AS QueueNumber;  -- Return the new queue number
      `);

    const queueNumber = result.recordset[0]?.QueueNumber;

    // Log queue number result for debugging
    console.log("Queue Number fetched from database:", queueNumber);

    if (!queueNumber) {
      throw new Error("Queue number not retrieved. Check database query.");
    }

    return queueNumber;
  } catch (error) {
    console.error("Error in addContact function:", error.message);
    throw new Error("Error inserting contact info: " + error.message);
  }
}

module.exports = { addContact };





