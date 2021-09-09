var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var exerciseSchema = new Schema({
    title : { type : String},
    repetitions : { type : Number},
    sets : { type : Number}
});

module.exports = mongoose.model('exercises', exerciseSchema);