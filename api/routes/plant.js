var express = require('express');
var router = express.Router();
var db = require("../db");

var getAllPlantsQuery = `SELECT p.id, p.common_name, p.genus, p.species, p.min_height, p.max_height, p.min_spread, p.max_spread, p.type_id, t.name as plant_type,
p.native, p.min_hardiness, p.max_hardiness, p.color_id, c.name as color, p.front_image_path, p.side_image_path, s.espring, s.lspring, s.esummer, s.lsummer,
s.efall, s.lfall, s.winter, r.regions, t.soil_types
FROM plant as p
LEFT JOIN season as s ON (p.id == c.plant_id)
LEFT JOIN plant_type as t ON (p.type_id = t.id)
LEFT JOIN color as c ON (p.color_id = c.id)
LEFT JOIN (
    SELECT pr.plant_id, JSON_ARRAYAGG(region.name) as regions
    FROM region
    LEFT JOIN plant_region_xref as pr ON (pr.region_id = region.id)
) as r ON (p.id = r.plant_id)
LEFT JOIN (
    SELECT pt.plant_id, JSON_ARRAYAGG(soil_type.name) as soil_types
    FROM soil_type
    LEFT JOIN plant_soil_xref as pt ON (pt.soil_type_id = soil_type.id)
) as t ON (p.id = t.plant_id)
GROUP BY p.id`;

var getAllPlantsQuery2 = `SELECT p.id, p.common_name, p.genus, p.species, p.min_height, p.max_height, p.min_spread, p.max_spread, p.type_id, t.name as plant_type,
p.native, p.min_hardiness, p.max_hardiness, p.color_id, c.name as color, p.front_image_path, p.side_image_path,
p.espring, p.lspring, p.esummer, p.lsummer, p.efall, p.lfall, p.ewinter, p.lwinter, JSON_ARRAYAGG(r.name) as regions, JSON_ARRAYAGG(st.name) as soil_types
FROM plant as p
LEFT JOIN plant_type as t ON (p.type_id = t.id)
LEFT JOIN season as s ON (p.id == c.plant_id)
LEFT JOIN color as c ON (p.color_id = c.id)
LEFT JOIN plant_region_xref as pr ON (pr.plant_id = p.id)
LEFT JOIN region as r ON (r.id = pr.region_id)
LEFT JOIN plant_soil_xref as pt ON (pt.plant_id = p.id)
LEFT JOIN soil_type as st ON (st.id = pt.soil_type_id)
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
            });*/
            row.regions = JSON.parse(row.regions);
            row.regions = row.regions.filter((v, i, a) => a.indexOf(v) === i);
            row.soil_types = JSON.parse(row.soil_types);
            row.soil_types = row.soil_types.filter((v, i, a) => a.indexOf(v) === i);
        });

        res.json(rows);
    });
});

module.exports = router;
