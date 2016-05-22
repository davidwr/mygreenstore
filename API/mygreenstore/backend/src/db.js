var fs = require('fs')
var path = require('path')
var mongoose = require('mongoose')

module.exports = (callback) => {
	mongoose.connect(global.CONFIG.getConnectionString(), function (err) {
		if (err)
      return callback(err)

    console.log('MongoDB connected.');

    global.MODELS = require('./models');

		callback();
	});
}
