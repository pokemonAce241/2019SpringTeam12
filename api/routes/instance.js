var express = require('express');
var router = express.Router();
var db = require("../db");

getAllFromGardenQuery = `SELECT pi.id, pi.garden_id, pi.plant_id, plant.front_image_path, plant.side_image_path, pi.x, pi.y
FROM plant_instance as pi
INNER JOIN plant ON pi.plant_id = plant.id
WHERE garden_id = ?`;

getSingleInstanceQuery = `SELECT pi.id, pi.garden_id, pi.plant_id, plant.front_image_path, plant.side_image_path, pi.x, pi.y
FROM plant_instance as pi
INNER JOIN plant ON pi.plant_id = plant.id
WHERE pi.id = ?`;

// Get all instances in a garden
router.get('/garden/:garden_id(\\d+)', function(req, res, next) {
    db.query(getAllFromGardenQuery, req.params.garden_id, function(err, rows, fields) {
        res.json(rows);
    });
});

// Get single instance by ID
router.get('/:id(\\d+)', function(req, res, next) {
    db.query(getSingleInstanceQuery, req.params.id, function(err, rows, fields) {
        if (rows.length === 0) {
            return next();
        }
        res.json(rows[0]);
    });
});

module.exports = router;