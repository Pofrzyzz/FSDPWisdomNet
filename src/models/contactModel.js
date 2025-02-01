// src/models/contactModel.js
const { sql, poolPromise } = require('../../dbConfig');

async function addContact(mobileNumber, selectedProblem) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('MobileNumber', sql.NVarChar(15), mobileNumber)
      .input('SelectedProblem', sql.NVarChar(255), selectedProblem)
      .query(`
        -- Calculate the last queue number or start at 0 if the table is empty
        DECLARE @LastQueueNumber INT = (SELECT MAX(QueueNumber) FROM ContactUs);
        DECLARE @NewQueueNumber INT = COALESCE(@LastQueueNumber + 1, 0); -- If null, start at 0

        -- Insert the new contact into the ContactUs table
        INSERT INTO ContactUs (MobileNumber, SelectedProblem, QueueNumber)
        VALUES (@MobileNumber, @SelectedProblem, @NewQueueNumber);

        -- Return the new queue number
        SELECT @NewQueueNumber AS QueueNumber;
      `);

    // Extract the queue number from the query result
    const queueNumber = result.recordset[0]?.QueueNumber;

    // Log the queue number for debugging
    console.log("Queue Number fetched from database:", queueNumber);

    if (queueNumber === undefined) {
      throw new Error("Queue number not retrieved. Check database query.");
    }

    return queueNumber;
  } catch (error) {
    console.error("Error in addContact function:", error.message);
    throw new Error("Error inserting contact info: " + error.message);
  }
}

module.exports = { addContact };









