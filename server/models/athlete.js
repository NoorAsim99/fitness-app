var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var athleteSchema = new Schema({
    username : { type : String}
});

module.exports = mongoose.model('athletes', athleteSchema);