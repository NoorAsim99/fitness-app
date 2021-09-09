var express = require('express');
var router = express.Router();
var Athlete = require('../models/athlete');

// Create a new athlete
router.post('/api/athletes', function(req, res, next){
    var athlete = new Athlete(req.body);
    athlete["username"] = "Testname";
    athlete.save(function(err, athlete){
        if (err) {return next(err);}
        res.status(201).json(athlete);
    })
});

// Return a list of all athletes
router.get('/api/athletes', function(req, res, next) {
    Athlete.find(function(err, athletes) {
        if (err) { return next(err); }
        res.json({"athletes": athletes});
    });
});


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

// Partially update the athlete with the given id by adding the id of a workout
router.patch('/api/athletes/:id/:workoutId', function(req, res, next) {
    var id = req.params.id;
    var workId = req.params.workoutId;
    Athlete.findById(id, function(err, athlete) {
        if (err) { return next(err); }
        if (athlete == null) {
            return res.status(404).json({"message": "Athlete not found"});
        }
        athlete.workouts.push(workId)
        athlete.save();
        res.json(athlete);
    });
});

// Update the athlete with the given ID
router.put('/api/athletes/:id/:newName', function(req, res, next) {
    var id = req.params.id;
    var newName = req.params.newName;
    Athlete.findById(id, function(err, athlete) {
        if (err) { return next(err); }
        if (athlete == null) {
            return res.status(404).json({"message": "Athlete not found"});
        }
        athlete.username = newName;
        athlete.save();
        res.json(athlete);
    });
});

// Delete the athlete with the given ID
router.delete('/api/athletes/:id', function(req, res, next) {
    var id = req.params.id;
    Athlete.findOneAndDelete({_id: id}, function(err, athlete) {
        if (err) { return next(err); }
        if (athlete == null) {
            return res.status(404).json({"message": "Athlete not found"});
        }
        res.json(athlete);
    });
});

// Error handler (must be registered last)
router.use(function(err, req, res, next) {
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


module.exports = router;