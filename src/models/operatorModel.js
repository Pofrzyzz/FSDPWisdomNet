const { poolPromise } = require('../../dbConfig');

const getAvailableOperator = async (branchId, departmentId) => {
  const pool = await poolPromise;
  const request = pool.request();
  request.input('BranchID', branchId);
  request.input('DepartmentID', departmentId);

  const result = await request.query(`
    SELECT TOP 1 OperatorID, OperatorName FROM Operators
    WHERE BranchID = @BranchID AND AssignedDepartmentID = @DepartmentID
  `);

  return result.recordset[0]; // Return the first available operator or null
};

// 🔹 New function to authenticate operator login
const getOperator = async (username, pin) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('Username', username);
    request.input('Pin', pin);

    const result = await request.query(`
      SELECT OperatorID, OperatorName, AssignedDepartmentID
      FROM Operators
      WHERE OperatorName = @Username AND Pin = @Pin
    `);

    return result.recordset[0]; // Return operator details if found
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
};

module.exports = { getAvailableOperator, getOperator };
