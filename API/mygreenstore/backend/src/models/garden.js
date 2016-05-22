"use strict";

var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Schema = mongoose.Schema;

var Garden = new Schema({
	name: {
		type: String,
		required: "Name is required"
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: "Garden owner is required",
		unique: "You already have a garden"
	},
	location: {
		type: [Number],
		index: '2dsphere',
		required: "Invalid coordinates for garden"
	},
	photo: {
		type: String
	},
	address: {
		type: String,
		required: "Address is required"
	},
	phone: {
		type: String,
	},
	deliveryDays: {
		type: Number
	}
}, { collection: 'garden' });

Garden.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Garden", Garden);
