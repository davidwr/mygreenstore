"use strict";

var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Schema = mongoose.Schema;

var User = new Schema({
	name: {
		type: String,
		required: "Name is required"
	},
	email: {
		type: String,
		required: "Name is required",
		unique: "You are already registered"
	},
	token: {
		type: String,
		required: true
	},
	orders: {
		type: [Schema.Types.ObjectId],
		ref: "Order"
	},
	products: {
		type: [Schema.Types.ObjectId],
		ref: "Product"
	}
}, { collection: 'user' });

User.set('toJSON', { virtuals: true });

module.exports = mongoose.model("User", User);
