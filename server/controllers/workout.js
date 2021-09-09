var express = require('express');
var router = express.Router();
var Workout = require('../models/workout');

// Create a new workout
router.post('/api/workouts/:title', function(req, res, next){
    const workout = Workout({title: req.params.title, exercises: []});
    workout.save(function(err, workout){
        if (err) {return next(err);}
        res.status(201).json(workout);
    })
});

// Return a list of all workouts
router.get('/api/workouts', function(req, res, next) {
    Workout.find(function(err, workouts) {
        if (err) { return next(err); }
        res.json({"workouts": workouts});
    });
});

// Return the workout with the given ID
router.get('/api/workouts/:id', function(req, res, next) {
    var id = req.params.id;
    Workout.findById(req.params.id, function(err, workout) {
        if (err) { return next(err); }
        if (workout == null) {
            return res.status(404).json({"message": "Workout not found"});
        }
        res.json(workout);
    });
});

// -- ASK TA ABOUT THIS
// Partially update the workout with the given id by adding the id of an exercise 
router.patch('/api/workouts/:id/:exerciseId', function(req, res, next) {
    var id = req.params.id;
    var exerId = req.params.exerciseId;
    Workout.findById(id, function(err, workout) {
        if (err) { return next(err); }
        if (workout == null) {
            return res.status(404).json({"message": "Workout not found"});
        }
        workout.exercises.push(exerId)
        workout.save();
        res.json(workout);
    });
});

/*
// Update the workout with the given ID -- NEED THIS IF PATCH HANDLES ADDING EXERCISES?
router.put('/api/workouts/:id/:newTitle/:newRepetitions/:newSets', function(req, res, next) {
    var id = req.params.id;
    Workout.findById(id, function(err, workout) {
        if (err) { return next(err); }
        if (workout == null) {
            return res.status(404).json({"message": "Workout not found"});
        }
        workout.title = req.params.newTitle;
        workout.repetitions = req.params.newRepetitions;
        workout.sets = req.params.newSets;
        workout.save();
        res.json(workout);
    });
});
*/




// Delete the workout with the given ID
router.delete('/api/workouts/:id', function(req, res, next) {
    var id = req.params.id;
    Workout.findOneAndDelete({_id: id}, function(err, workout) {
        if (err) { return next(err); }
        if (workout == null) {
            return res.status(404).json({"message": "Workout not found"});
        }
        res.json(workout);
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