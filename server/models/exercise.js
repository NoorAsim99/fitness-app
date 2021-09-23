var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var exerciseSchema = new Schema({
    title : { type : String},
    repetitions : { type : Number},
    sets : { type : Number},
    intensity : { type : String}
});

module.exports = mongoose.model('exercises', exerciseSchema);

//username : { type: String, required: true, unique: true}
