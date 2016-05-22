"use strict";

var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Schema = mongoose.Schema;

var Profile = new Schema({
	name: {
		type: String,
		required: "Name is required"
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: "Profile owner is required",
		unique: "You already have a garden"
	},
	photo: {
		type: String
	},
	phone: {
		type: String
	}
}, { collection: 'profile' });

Profile.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Profile", Profile);
