var mysql = require('mysql');
/*
var connection = mysql.createConnection({
    host: 'sd-vm13.csc.ncsu.edu',
    user: 'dev',
    password: 'bees!',
    database: 'garden'
}); */

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Leinad1!',
    database: 'garden'
 });

connection.connect();

module.exports = connection;