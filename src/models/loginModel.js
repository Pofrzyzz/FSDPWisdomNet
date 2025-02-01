const { sql, poolPromise } = require('../../dbConfig');

const getUser = async (username, pin) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('pin', sql.Int, pin)
      .query(`
        SELECT UserID, Username
        FROM Users 
        WHERE Username = @username AND Pin = @pin
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("Error fetching user by credentials:", error);
    throw error;
  }
};

module.exports = { getUser };
