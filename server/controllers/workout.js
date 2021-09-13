var express = require('express');
var router = express.Router();
var Workout = require('../models/workout');
var Exercise = require('../models/exercise');

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

// Return the exercises in a workout with the given ID
router.get('/api/workouts/:id/exercises', function(req, res, next) {

    var id = req.params.id;
    var exercisesArr = [];

    // 1. Find the workout with the given id, then for every exercise id within the workout
    // get the full info and append it to the array exercisesArr
    Workout.findById(req.params.id, function(err, workout) {
        if (err) { return next(err); }
        if (workout == null) {
            return res.status(404).json({"message": "Workout not found"});
        }
        
        for (let i = 0; i < workout.exercises.length; i++) {
            Exercise.findById(workout.exercises[i], function(err, exercise) {
                if (err) { return next(err); }
                if (exercise != null) {
                    exercisesArr.push(exercise);
                }
            });
        }
    });

    // 2. Once the code above has added all exercises to the array, return that array to the client
    setTimeout(function() {
        if (exercisesArr.length > 0) {
            return res.status(200).json(exercisesArr);
         } else {
            console.log("404");
            return res.status(404).json({"message": "Exercises not found"});
        }
    }, 500);

});

// Get a specific exercise in a workout
router.get('/api/workouts/:id/exercises/:exercise_id', function(req, res, next) {

    var id = req.params.id;
    var exerciseId = req.params.exercise_id;

    // 1. Find the workout with the given id, then for every exercise id within the workout
    // get the full info and append it to the array exercisesArr
    Workout.findById(req.params.id, function(err, workout) {
        if (err) { return next(err); }
        if (workout == null) {
            return res.status(404).json({"message": "Workout not found"});
        }

        if(workout.exercises.includes(exerciseId)) {
            Exercise.findById(exerciseId, function(err, exercise) {
                if (err) { return next(err); }
                if (exercise == null) {
                    return res.status(404).json({"message": "Exercise not found"});
                }
                res.json(exercise);
            });
        }
        else {
            return res.status(404).json({"message": "Exercise not found"});
        }
    });

});

// Delete a specific exercise in a workout
router.delete('/api/workouts/:id/exercises/:exercise_id', function(req, res, next) {

    var id = req.params.id;
    var exerciseId = req.params.exercise_id;

    // 1. Find the workout with the given id, then for every exercise id within the workout
    // get the full info and append it to the array exercisesArr
    Workout.findById(req.params.id, function(err, workout) {
        if (err) { return next(err); }
        if (workout == null) {
            return res.status(404).json({"message": "Workout not found"});
        }

        /* This will also delete the exercise from the database
        if(workout.exercises.includes(exerciseId)) {
            Exercise.findOneAndDelete({_id: exerciseId}, function(err, exercise) {
                if (err) { return next(err); }
                if (exercise == null) {
                    return res.status(404).json({"message": "Exercise not found"});
                }
                res.json(exercise);
                workout.exercises = workout.exercises.filter(function(value, index, arr){ 
                    return value != exerciseId;
                });
                workout.save();
            });
        }*/
        // This will only remove the exercise from the workout, without deleting it from the DB
        if(workout.exercises.includes(exerciseId)) {
            workout.exercises = workout.exercises.filter(function(value, index, arr){ 
                return value != exerciseId;
            });
            workout.save();
            res.json(workout);
        }
        else {
            return res.status(404).json({"message": "Exercise not found"});
        }
    });

});

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