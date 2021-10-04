var express = require('express');
var router = express.Router();
var Traininglog = require('../models/traininglog');

//create a training log, how do i impliment a date?
router.post('/api/traininglogs', function(req, res, next){
    var traininglog = new Traininglog(req.body);
    traininglog.save(function(err, traininglog){
        if (err) {return next(err);}
        res.status(201).json(traininglog);
    })
});

// Return a list of all traininglog
router.get('/api/traininglogs', function(req, res, next) {
    Traininglog.find(function(err, traininglogs) {
        if (err) { return next(err); }
        if (traininglogs == null) {
            return res.status(404).json({ "message": "No logs found" })
        }
        res.status(200).json({"traininglogs": traininglogs});
    });
});

//return the training log of an athlete with the given ID
router.get('/api/traininglogs/:id', function(req, res, next) {
    var id = req.params.id;
    Traininglog.findById(req.params.id, function(err, traininglog) {
        if (err) { return next(err); }
        if (traininglog== null) {
            return res.status(404).json({"message": "training log not found"});
        }
        res.json(traininglog);
    });
});

//delete a training log, not sure how to impliment it 
router.delete('/api/traininglogs/:id', function(req, res, next) {
    var id = req.params.id;
    Traininglog.findOneAndDelete({_id: id}, function(err, traininglog) {
        if (err) { return next(err); }
        if (traininglog == null) {
            return res.status(404).json({"message": "traininglog not found"});
        }
        return res.status(204).json(traininglog);
    });
});

router.delete('/api/traininglogs', function(req, res, next) {
    Traininglog.deleteMany(function(err, traininglog) {
        if (err) { return next(err); }
        if (traininglog == null) {
            return res.status(404).json({"message": "No Traininglogs Found"});
        }
        return res.status(204).json(traininglog);
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
