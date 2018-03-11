// Dependencies

var mysql = require('mysql');

var connection;

connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "1221",
    database: "burgers_db"
})

connection.connect(function(err) {
    if(err) {
        console.err("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;
