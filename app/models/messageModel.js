var tungus = require('tungus');
var mongoose = require('mongoose');

module.exports = mongoose.model('Message', {message: String, user_id: Number, status: Number, timestamp: String});