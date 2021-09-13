var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workoutSchema = new Schema({
    title : { type : String},
    exercises: { type : [String]} // Schema.Types.ObjectId
});

module.exports = mongoose.model('workouts', workoutSchema);