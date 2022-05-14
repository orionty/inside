var mysql = require('mysql');
//MySQL Connection

var connection = mysql.createConnection({
    host: "localhost",
    database: "mail",
    user: "root",
    password: ""
  });
  
  module.exports = connection;
