var express = require('express');
var router = express.Router();
var db = require("../db");

const MOCK_GARDENS = [
    {
        "id": 1,
        "name": "test",
        "user_id": 1,
        "user_email": "asdf@asdf.com",
        "date_created": "datestring",
        "date_modified": "datestring"
    },
    {
        "id": 2,
        "name": "test2",
        "user_id": 1,
        "user_email": "asdf@asdf.com",
        "date_created": "datestring",
        "date_modified": "datestring"
    },
    {
        "id": 3,
        "name": "test3",
        "user_id": 2,
        "user_email": "asdf@asdf.com",
        "date_created": "datestring",
        "date_modified": "datestring"
    }
]

getAllGardensQuery = `SELECT garden.id, garden.name, garden.user_id, user.email as user_email, garden.date_created, garden.date_modified
FROM GARDEN
INNER JOIN user ON garden.user_id = user.id`;

getSingleGardenQuery = `SELECT garden.id, garden.name, garden.user_id, user.email as user_email, garden.date_created, garden.date_modified
FROM GARDEN
INNER JOIN user ON garden.user_id = user.id
WHERE garden.id = ?`;

// GET all gardens
router.get('/', function(req, res, next) {
    db.query(getAllGardensQuery, function(err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
});

// GET single garden
router.get('/:id(\\d+)', function(req, res, next) {
    db.query(getSingleGardenQuery, req.params.id, function(err, rows, fields) {
        if (rows.length === 0) {
            return next();
        }
        res.json(rows[0]);
    });


    // var garden = MOCK_GARDENS.find(g => g.id == req.params.id);
    // // console.log(garden);

    // if (garden !== undefined) {
    //     res.json(garden);
    // } else {
    //     // Call error handler
    //     next();
    // }
});

// POST garden
router.post('/', function(req, res, next) {
    // console.log(req.body);
    

    // Body must have a valid user ID
    if (req.body.userId === undefined) {
        return res.status(400).send("Bad request");
    }

    var garden = MOCK_GARDENS[0];
    garden.id = 4;
    res.status(201).json(garden);
});

// PUT garden
router.put('/:id(\\d+)', function(req, res, next) {
    console.log(req.params.id);
    console.log(req.body);

    var garden = MOCK_GARDENS.find(g => g.id == req.params.id);
    if (garden === undefined) {
        return next();
    }

    if (req.body.user_id === undefined) {
        return res.status(400).send("Bad request");
    }

    res.json(garden);
});

module.exports = router;