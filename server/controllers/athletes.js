var express = require('express');
var router = express.Router();
var Athlete = require('../models/athlete');

// Create a new athlete
router.post('/api/athletes', function(req, res, next){
    var athlete = new Athlete(req.body);
    athlete.save(function(err, athlete){
        if (err) {return next(err);}
        res.status(201).json(athlete);
    })
});
/*
// Return a list of all athletes
router.get('/api/athletes', function(req, res, next) {
    Athlete.find(function(err, athletes) {
        if (err) { return next(err); }
        res.json({"athletes": athletes});
    });
});
*/

// Return the athlete with the given ID
router.get('/api/athletes/:id', function(req, res, next) {
    var id = req.params.id;
    Athlete.findById(req.params.id, function(err, athlete) {
        if (err) { return next(err); }
        if (athlete == null) {
            return res.status(404).json({"message": "Athlete not found"});
        }
        res.json(athlete);
    });
});
/*
// Update the athlete with the given ID
app.put('/camels/:id', function(req, res, next) {
    var id = req.params.id;
    Camel.findById(id, function(err, camel) {
        if (err) { return next(err); }
        if (camel == null) {
            return res.status(404).json({"message": "Camel not found"});
        }
        camel.color = req.body.color;
        camel.position = req.body.position;
        camel.save();
        res.json(camel);
    });
});

// Partially athlete the camel with the given ID
app.patch('/camels/:id', function(req, res, next) {
    var id = req.params.id;
    Camel.findById(id, function(err, camel) {
        if (err) { return next(err); }
        if (camel == null) {
            return res.status(404).json({"message": "Camel not found"});
        }
        camel.color = (req.body.color || camel.color);
        camel.position = (req.body.position || camel.position);
        camel.save();
        res.json(camel);
    });
});

// Delete the athlete with the given ID
app.delete('/camels/:id', function(req, res, next) {
    var id = req.params.id;
    Camel.findOneAndDelete({_id: id}, function(err, camel) {
        if (err) { return next(err); }
        if (camel == null) {
            return res.status(404).json({"message": "Camel not found"});
        }
        res.json(camel);
    });
});

// Error handler (must be registered last)
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        "message": err.message,
        "error": {}
    };
    if (app.get('env') === 'development') {
        err_res["error"] = err;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

*/
module.exports = router;