var express = require('express');
var router = express.Router();

router.get('/1', function(req, res, next) {
    var response = {"test": 123};
    res.json(response);
});

module.exports = router;