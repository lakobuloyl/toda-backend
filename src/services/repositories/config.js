const mysql = require("mysql2");

const mysqlConnection = mysql.createPool({
  host: "156.67.222.52",
  user: "u554427230_toda_db",
  password: "trisadaDb_123",
  database: "u554427230_toda_db",
});
module.exports = mysqlConnection.promise();
