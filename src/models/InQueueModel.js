const { sql, poolPromise } = require('../../dbConfig'); // Ensure this path is correct

async function reduceQueueNumber(mobileNumber) {
  try {
    console.log('Connecting to database...');
    
    const pool = await poolPromise; // This is where the error occurs if not imported
    console.log('Database connection established.');

    console.log('Executing UPDATE query to reduce queue number for mobile number:', mobileNumber);
    
    // Check if the mobile number exists first
    const checkUser = await pool.request()
      .input('MobileNumber', sql.NVarChar(15), mobileNumber)
      .query('SELECT QueueNumber FROM ContactUs WHERE MobileNumber = @MobileNumber');

    if (checkUser.recordset.length === 0) {
      console.log('No user found with that mobile number.');
      return { success: false, message: 'No user found with this mobile number.' };
    }

    // Reduce queue number if user exists
    const result = await pool.request()
      .input('MobileNumber', sql.NVarChar(15), mobileNumber)
      .query(`
        UPDATE ContactUs
        SET QueueNumber = QueueNumber - 1
        WHERE MobileNumber = @MobileNumber AND QueueNumber > 0
      `);

    console.log(`Queue number reduced for ${mobileNumber}.`);
    return { success: true, message: 'Queue number decreased.' };
  } catch (error) {
    console.error('Error reducing queue number:', error.message);
    return { success: false, message: 'Error reducing queue number: ' + error.message };
  }
}

module.exports = { reduceQueueNumber };

  






