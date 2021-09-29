var express = require('express');
var router = express.Router();
var Athlete = require('../models/athlete');
var Workout = require('../models/workout');

// Create a new athlete
router.post('/api/athletes', function(req, res, next){
    var athlete = new Athlete(req.body);
    athlete.save(function(err, athlete){
        if (err) {
            if(err.code == 11000) { // Means an athlete with that username already exists
                return res.status(400).json({"message" : "Username taken"});
            }
            else {
                return next(err);
            }
        }
        res.status(201).json(athlete);
    })
});

// Return a list of all athletes
router.get('/api/athletes', function(req, res, next) {
    Athlete.find(function(err, athletes) {
        if (err) { return next(err); }
        if (athletes == null) {
            res.status(404).json({"message": "Athletes not found"});
        }
        res.json({"athletes": athletes});
    });
});

/*
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
*/

// Return the athlete with the given username -- HAS NO TEST
router.get('/api/athletes/:name', function(req, res, next) {
    var name = req.params.name;
    Athlete.find({ "username": name }, function(err, athlete) {
        if (err) { return next(err); }
        if (athlete == null || athlete.length === 0) {
            res.status(404).json({"message": "Athlete not found"});
        } else {
            res.json(athlete);
        }
    });
});

// Return the workouts in an athlete with the given ID
router.get('/api/athletes/:id/workouts', function(req, res, next) {

    var id = req.params.id;

    Athlete.findById(req.params.id, function(err, athlete) {
        if (err) { return next(err); }
        if (athlete == null) {
            return res.status(404).json({"message": "Athlete not found"});
        }

        Workout.find({
            '_id': { $in: athlete.workouts }
        }, function(err, foundWorkouts){
             if (foundWorkouts.length != null) {
                return res.status(200).json(foundWorkouts);
             } else {
                return res.status(404).json({"message": "Workouts not found"});
            }
        });
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
router.put('/api/athletes/:id', function(req, res, next) {
    var id = req.params.id;
    var newName = req.body.username;
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