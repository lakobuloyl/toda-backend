const mysql = require("mysql2");

const mysqlConnection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database:"toda_db"
})
module.exports = mysqlConnection.promise();
