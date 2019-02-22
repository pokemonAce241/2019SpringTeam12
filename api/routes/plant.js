var express = require('express');
var router = express.Router();
var db = require("../db");

var getAllPlantsQuery = `SELECT p.id, p.common_name, p.genus, p.species, p.min_height, p.max_height, p.min_spread, p.max_spread, p.plant_type, 
p.native, p.min_hardiness, p.max_hardiness, c.red, c.blue, c.purple, c.pink, c.yellow, c.white, c.orange, c.green, c.other, p.front_image_path, p.side_image_path, s.espring, s.lspring, s.esummer, s.lsummer,
s.efall, s.lfall, s.winter, r.mountain, r.piedmont, r.coast, d.wet, d.moist, d.dry
FROM plant as p
LEFT JOIN seasons as s ON (p.id = s.plant_id)
LEFT JOIN color as c ON (p.id = c.plant_id)
LEFT JOIN regions as r ON (p.id = r.plant_id)
LEFT JOIN soil as d ON (p.id = d.plant_id)
GROUP BY p.id`;

var getAllPlantsQuery2 = `SELECT p.id, p.common_name, p.genus, p.species, p.min_height, p.max_height, p.min_spread, p.max_spread, p.plant_type,
p.native, p.min_hardiness, p.max_hardiness, c.red, c.blue, c.purple, c.pink, c.yellow, c.white, c.orange, c.green, c.other, p.front_image_path, p.side_image_path,
s.espring, s.lspring, s.esummer, s.lsummer, s.efall, s.lfall, s.winter, r.mountain, r.piedmont, r.coast, d.wet, d.moist, d.dry
FROM plant as p
LEFT JOIN seasons as s ON (p.id = s.plant_id)
LEFT JOIN color as c ON (p.id = c.plant_id)
LEFT JOIN regions as r ON (p.id = r.plant_id)
LEFT JOIN soil as d ON (p.id = d.plant_id)
GROUP BY p.id`

// Get all plants
router.get('/', function(req, res, next) {
    db.query(getAllPlantsQuery2, function(err, rows, fields) {
        if (err) throw err;

        // console.log(rows);

        rows.forEach(row => {
            /*row.seasons = JSON.parse(row.seasons);
            console.log(row.seasons.filter((v, i, a) => a.indexOf(v) === i));
            row.seasons = row.seasons.filter(function(v, i, a) {
                console.log(v);
                console.log(i);
                return a.indexOf(v) === i;
            // });*/
            // row.regions = JSON.parse(row.regions);
            // row.regions = row.regions.filter((v, i, a) => a.indexOf(v) === i);
            // row.soil_types = JSON.parse(row.soil_types);
            // row.soil_types = row.soil_types.filter((v, i, a) => a.indexOf(v) === i);
        });

        res.json(rows);
    });
});

module.exports = router;
