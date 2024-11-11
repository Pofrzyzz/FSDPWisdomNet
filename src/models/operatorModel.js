// operatorModel.js
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

module.exports = { getAvailableOperator };
