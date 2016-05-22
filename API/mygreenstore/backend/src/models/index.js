var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var modelsFolder = path.resolve('./backend/src/models/');

var models = {};

function isAValidModel(file) {
	return file != 'index.js';
};

fs.readdirSync(modelsFolder).forEach(function (file) {
	if (isAValidModel(file)) {
		var model =	require(modelsFolder + '/' + file);
		models[model.modelName] = model;
	}
});

models.mongoose = mongoose;
module.exports = models;
