var mongoose = require('mongoose');
var traininglog = mongoose.traininglog;

var traininglog = new traininglog({
    title : { type : String},
    date : { type : String},

});

module.exports = mongoose.model('traininglog', traininglog);