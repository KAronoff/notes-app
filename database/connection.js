var mysql = require("mysql");
require("dotenv").config();

var connection;

// set up connection either locally or with JAWSDB when deployed
if (process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL); 
}
else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PW,
    database: "notes_db"
  })
}
if (field.type == "TINY" && field.length == 1) {
  return field.string() == "1"; // 1 = true, 0 = false
}
return next();


module.exports = connection;