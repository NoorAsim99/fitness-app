var express = require('express');
var router = express.Router();
var traininglog = require('../models/traininglog');

//create a training log, how do i impliment a date?
router.post('/api/traininglog', function(req, res, next){
    var traininglog = new traininglog(req.body);
    traininglog.save(function(err, traininglog){
        if (err) {return next(err);}
        res.status(201).json(traininglog);
    })
});

//return the training log of an athlete with the given ID
router.get('/api/traininglog/:id', function(req, res, next) {
    var id = req.params.id;
    traininglog.findById(req.params.id, function(err, traininglog) {
        if (err) { return next(err); }
        if (traininglog== null) {
            return res.status(404).json({"message": "training log not found"});
        }
        res.json(traininglog);
    });
});

//delete a training log, not sure how to impliment it 
router.delete('/api/traininglog/:id', function(req, res, next) {
    var id = req.params.id;
    traininglog.findOneAndDelete({_id: id}, function(err, traininglog) {
        if (err) { return next(err); }
        if (traininglog == null) {
            return res.status(404).json({"message": "traininglog not found"});
        }
        res.json(traininglog);
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