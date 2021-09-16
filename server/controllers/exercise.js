var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercise');

// Create a new exercise
router.post('/api/exercises', function(req, res, next){
    const exercise = Exercise({title: req.body.title, repetitions: req.body.repetitions, sets: req.body.sets});
    exercise.save(function(err, exercise){
        if (err) {return next(err);}
        res.status(201).json(exercise);
    })
});

// Return a list of all exercises
router.get('/api/exercises', function(req, res, next) {
    Exercise.find(function(err, exercises) {
        if (err) { return next(err); }
        if (exercises == null) {
            return res.status(404).json({"message": "Exercises not found"});
        }
        res.json({"exercises": exercises});
    });
});

// Return a list of all exercises
router.get('/api/exercises/search', function(req, res, next) {
    const title = req.body.title;
    Exercise.find(
        { "title": { "$regex": title, "$options": "i" } },
        function(err, exercises) { 
            if (err) { return next(err); }
            if (exercises == null) {
                return res.status(404).json({"message": "Exercises not found"});
            }
            res.json({"exercises": exercises});
    });
});


// Return the exercise with the given ID
router.get('/api/exercises/:id', function(req, res, next) {
    var id = req.params.id;
    Exercise.findById(req.params.id, function(err, exercise) {
        if (err) { return next(err); }
        if (exercise == null) {
            return res.status(404).json({"message": "Exercise not found"});
        }
        res.json(exercise);
    });
});


// Update the exercise with the given ID
router.put('/api/exercises/:id', function(req, res, next) {
    var id = req.params.id;
    Exercise.findById(id, function(err, exercise) {
        if (err) { return next(err); }
        if (exercise == null) {
            return res.status(404).json({"message": "Exercise not found"});
        }
        exercise.title = req.body.title;
        exercise.repetitions = req.body.repetitions;
        exercise.sets = req.body.sets;
        exercise.save();
        res.json(exercise);
    });
});

/*
// Partially update the exercise with the given ID -- IDK HOW TO USE RIGHT NOW
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
*/

// Delete the exercise with the given ID
router.delete('/api/exercises/:id', function(req, res, next) {
    var id = req.params.id;
    Exercise.findOneAndDelete({_id: id}, function(err, exercise) {
        if (err) { return next(err); }
        if (exercise == null) {
            return res.status(404).json({"message": "Exercise not found"});
        }
        res.json(exercise);
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