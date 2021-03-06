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
FROM garden
INNER JOIN user ON garden.user_id = user.id`;

getSingleGardenQuery = `SELECT garden.id, garden.name, garden.user_id, user.email as user_email, garden.date_created, garden.date_modified
FROM garden
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
        if (err) throw err;

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

createGardenQuery = `INSERT INTO garden(name, user_id) VALUES (?, ?)`;

// POST garden
router.post('/', function(req, res, next) {
    console.log(req.body);

    // Body must have a valid user ID and name
    if (req.body.user_id === undefined ||
        req.body.name === undefined) {
        return res.status(400).send("Bad request");
    }

    var post_data = [req.body.name, req.body.user_id];

    db.query(createGardenQuery, post_data, function(err, result, fields) {
        if (err) throw err;

        var response = req.body;
        response.id = result.insertId;
        res.status(201).json(response);
    });
});

// // PUT garden
// router.put('/:id(\\d+)', function(req, res, next) {
//     console.log(req.params.id);
//     console.log(req.body);

//     var garden = MOCK_GARDENS.find(g => g.id == req.params.id);
//     if (garden === undefined) {
//         return next();
//     }

//     if (req.body.user_id === undefined) {
//         return res.status(400).send("Bad request");
//     }

//     res.json(garden);
// });

deleteGardenQuery = `DELETE FROM garden WHERE id = ?`;

// DELETE garden
router.delete('/:id(\\d+)', function(req, res, next) {
    db.query(deleteGardenQuery, req.params.id, function(err, result, fields) {
        if (err) throw err;

        if (result.affectedRows === 0) {
            return next();
        }
        res.status(200).send();
    });
});

module.exports = router;
