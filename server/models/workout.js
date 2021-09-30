var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Exercise = require('../models/exercise');
//const Exercise = mongoose.model('Exercise', exerciseSchema);


var workoutSchema = new Schema({
    title : { type : String},
    exercises: [{ type : Schema.Types.ObjectId, ref: Exercise }] // Schema.Types.ObjectId
});

module.exports = mongoose.model('workouts', workoutSchema);