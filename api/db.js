var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'sd-vm13.csc.ncsu.edu',
    user: 'admin',
    password: 'sdcTeam12',
    database: 'garden'
});

// var connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: 'garden'
//  });

connection.connect();

module.exports = connection;
