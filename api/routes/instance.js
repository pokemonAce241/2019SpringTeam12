var express = require('express');
var router = express.Router();
var db = require("../db");

getAllFromGardenQuery = `SELECT pi.id, pi.garden_id, pi.plant_id, plant.common_name, plant.min_height, plant.max_height, plant.min_spread, plant.max_spread, plant.front_image_path, plant.side_image_path, pi.x, pi.y, pi.collision
FROM plant_instance as pi
INNER JOIN plant ON pi.plant_id = plant.id
WHERE garden_id = ?`;

getSingleInstanceQuery = `SELECT pi.id, pi.garden_id, pi.plant_id, plant.common_name, plant.min_height, plant.max_height, plant.min_spread, plant.max_spread, plant.front_image_path, plant.side_image_path, pi.x, pi.y, pi.collision
FROM plant_instance as pi
INNER JOIN plant ON pi.plant_id = plant.id
WHERE pi.id = ?`;

// Get all instances in a garden
router.get('/garden/:garden_id(\\d+)', function(req, res, next) {
    db.query(getAllFromGardenQuery, req.params.garden_id, function(err, rows, fields) {
        if (err) throw err;

        res.json(rows);
    });
});

// Get single instance by ID
router.get('/:id(\\d+)', function(req, res, next) {
    db.query(getSingleInstanceQuery, req.params.id, function(err, rows, fields) {
        if (err) throw err;

        if (rows.length === 0) {
            return next();
        }
        res.json(rows[0]);
    });
});

createInstanceQuery = `INSERT INTO plant_instance(garden_id, plant_id, x, y) VALUES (?, ?, ?, ?)`;

router.post('/', function(req, res, next) {
    console.log(req.body);
    if (req.body.garden_id === undefined ||
        req.body.plant_id === undefined ||
        req.body.x === undefined ||
        req.body.y === undefined ||
        req.body.collision === undefined) {
        return res.status(400).send("Bad request");
    }

    var post_data = [req.body.garden_id, req.body.plant_id, req.body.x, req.body.y, req.body.collision];

    db.query(createInstanceQuery, post_data, function(err, result, fields) {
        if(err) throw err;

        var response = req.body;
        response.id = result.insertId;
        res.status(201).json(response);
    });
});

updateInstanceQuery = `UPDATE plant_instance
SET x = ?, y = ?
WHERE id = ?`;

router.put('/:id(\\d+)', function(req, res, next) {

    if (req.body.x === undefined ||
        req.body.y === undefined) {
        return res.status(400).send("Bad request");
    }

    db.query(updateInstanceQuery, [req.body.x, req.body.y, req.params.id], function(err, result, fields) {
        if (err) throw err;

        console.log(result);
        if (result.affectedRows === 0) {
            return next();
        }
        res.status(200).send();
    });
});

deleteInstanceQuery = `DELETE FROM plant_instance WHERE id = ?`;

router.delete('/:id(\\d+)', function(req, res, next) {
    db.query(deleteInstanceQuery, req.params.id, function(err, result, fields) {
        if (err) throw err;

        if (result.affectedRows === 0) {
            return next();
        }

        res.status(200).send();
    })
});

module.exports = router;
