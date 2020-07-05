const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useFindAndModify: false });

module.exports.User = require('./user.model');
module.exports.Cab = require('./cab.model');

