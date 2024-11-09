const { sql } = require('../../dbConfig');

const getAllBranches = async () => {
  try {
    const pool = await sql.connect(process.env.DB_CONNECTION);
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
