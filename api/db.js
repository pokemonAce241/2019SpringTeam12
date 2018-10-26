var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'sd-vm13.csc.ncsu.edu',
    user: 'dev',
    password: 'bees!',
    database: 'garden'
});

connection.connect();

module.exports = connection;