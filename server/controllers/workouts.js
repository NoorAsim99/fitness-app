var express = require('express');
var router = express.Router();
var Workout = require('../models/workout');
var Exercise = require('../models/exercise');

// Create a new workout
router.post('/api/workouts', function(req, res, next){
    const workout = Workout({title: req.body.title, exercises: []});
    workout.save(function(err, workout){
        if (err) {return next(err);}
        res.status(201).json(workout);
    })
});

// Create a new exercise and directly add it to a workout
router.post('/api/workouts/:id/exercises', function(req, res, next) {
    var id = req.params.id;
    const exercise = Exercise({title: req.body.title, repetitions: req.body.repetitions, sets: req.body.sets});
    Workout.findById(req.params.id, function(err, workout) {
        if (err) { return next(err); }
        if (workout == null) {
            return res.status(404).json({"message": "Workout not found"});
        }
        exercise.save(function(err, exercise){
            if (err) {return next(err);}
            res.status(201).json(exercise);
        })
        workout.exercises.push(exercise._id);
        workout.save();
        res.json(workout);
    });
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

    Workout.findById(req.params.id, function(err, workout) {
        if (err) { return next(err); }
        if (workout == null) {
            return res.status(404).json({"message": "Workout not found"});
        }

        Exercise.find({
            '_id': { $in: workout.exercises }
        }, function(err, foundExercises){
             if (foundExercises.length != null) {
                return res.status(200).json(foundExercises);
             } else {
                return res.status(404).json({"message": "Exercises not found"});
            }
        });
    });
});

// Get a specific exercise in a workout
router.get('/api/workouts/:id/exercises/:exercise_id', function(req, res, next) {

    var id = req.params.id;
    var exerciseId = req.params.exercise_id;

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
                return res.status(200).json(exercise);
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
            res.status(204); // Would like to return the new workout to the client, but returning anything other than a 204 results in a failed pipeline
        }
        else {
            return res.status(404).json({"message": "Exercise not found"});
        }
    });

});

// Partially update the workout with the given id by adding the id of an exercise
router.patch('/api/workouts/:id/exercises/:exerciseId', function(req, res, next) {
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
        res.status(204);
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
