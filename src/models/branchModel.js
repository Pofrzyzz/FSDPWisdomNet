const { sql, poolPromise } = require('../../dbConfig');

const getAllBranches = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT BranchID as id, BranchName as name, Street as street, Location as additionalInfo 
      FROM Branch
    `);
    return result.recordset;
  } catch (error) {
    console.error("Error fetching branches:", error);
    throw error;
  }
};

module.exports = { getAllBranches };
