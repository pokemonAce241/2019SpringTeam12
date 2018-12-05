const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const port = 3000;

var index = require('./routes');
var test = require('./routes/test');
var garden = require('./routes/garden');
var instance = require('./routes/instance');
var plant = require('./routes/plant');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    next();
})

// Allows use to parse req.body
app.use(bodyParser.json());

app.use('/', index);
app.use('/gardens', garden);
app.use('/instances', instance);
app.use('/plants', plant);
// app.use('/test', test);

// error handler
app.use(function(req, res, next) {
    res.status(404).send("404 - Page not Found");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
