var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var traininglog = new Schema({
    title : { type : String},
    date : { type : String},

});

module.exports = mongoose.model('traininglog', traininglog);