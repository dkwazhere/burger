// Dependencies
var connection = require('./connection.js');

// Helper function for SQL syntax

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i ++) {
        arr.push("?");
    }
    return arr.toString();
}

// Helper function to convert object key/value pairs to sql syntax
function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        arr.push(key + "=" + ob[key]);
    }
    return arr.toString();
}

// Object for all SQL statement functions
var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if(err){throw err;}
            cb(result);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        // database query
        connection.query(queryString, vals, function(err, result) {
            if(err) {throw err;}
            cb(result);
        });
    },
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        // database query
        connection.query(queryString, function(err, results) {
            if(err) {throw err;}
            cb(result);
        });
    }
};

// Export the orm object for use in other models
module.exports = orm;
