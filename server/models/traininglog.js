var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var traininglogSchema = new Schema({
    title : { type : String},
    date : { type : String},

});

module.exports = mongoose.model('traininglogs', traininglogSchema);