var express = require('express');
var router = express.Router();
var Athlete = require('../models/athlete');

router.post('/api/athletes', function(req, res, next){
    var athlete = new Athlete(req.body);
    athlete.save(function(err, athlete){
        if (err) {return next(err);}
        res.status(201).json(athlete);
    })
});

module.exports = router;