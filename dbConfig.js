// dbConfig.js
const sql = require('mssql');

const dbConfig = {
  user: "wisdomnetadmin",
  password: "wisdomnetadmin",
  server: "localhost",
  database: "wisdomnet",
  trustServerCertificate: true,
  options: {
    port: 1433,
    connectionTimeout: 60000,
  },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch(err => {
    console.error("Database connection failed:", err);
  });

module.exports = {
  sql,
  poolPromise,
};

  