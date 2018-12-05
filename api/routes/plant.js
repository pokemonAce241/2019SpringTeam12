var express = require('express');
var router = express.Router();
var db = require("../db");

var getAllPlantsQuery = `SELECT p.id, p.common_name, p.genus, p.species, p.min_height, p.max_height, p.min_spread, p.max_spread, p.type_id, t.name as plant_type,
p.native, p.min_hardiness, p.max_hardiness, p.color_id, c.name as color, p.front_image_path, p.side_image_path,
s.seasons, r.regions, t.soil_types
FROM plant as p
INNER JOIN plant_type as t ON (p.type_id = t.id)
INNER JOIN color as c ON (p.color_id = c.id)
INNER JOIN (
    SELECT ps.plant_id, JSON_ARRAYAGG(season.name) as seasons
    FROM season
    INNER JOIN plant_season_xref as ps ON (ps.season_id = season.id)
) as s ON (p.id = s.plant_id)
INNER JOIN (
    SELECT pr.plant_id, JSON_ARRAYAGG(region.name) as regions
    FROM region
    INNER JOIN plant_region_xref as pr ON (pr.region_id = region.id)
) as r ON (p.id = r.plant_id)
INNER JOIN (
    SELECT pt.plant_id, JSON_ARRAYAGG(soil_type.name) as soil_types
    FROM soil_type
    INNER JOIN plant_soil_xref as pt ON (pt.soil_type_id = soil_type.id)
) as t ON (p.id = t.plant_id)`;

// Get all plants
router.get('/', function(req, res, next) {
    db.query(getAllPlantsQuery, function(err, rows, fields) {
        if (err) throw err;

        rows.forEach(row => {
            row.seasons = JSON.parse(row.seasons);
            row.regions = JSON.parse(row.regions);
            row.soil_types = JSON.parse(row.soil_types);
        });

        res.json(rows);
    });
});

module.exports = router;