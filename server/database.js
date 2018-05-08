'use strict';

var mongoose = require('mongoose');
//load database
mongoose.connect('mongodb://localhost/geodata');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('Connection with database succeeded.');
});
exports.db = db;