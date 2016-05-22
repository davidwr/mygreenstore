"use strict";

var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Schema = mongoose.Schema;

var Item = new Schema({
	price: {
		type: Number,
		required: "price is required"
	},
	quantity: {
		type: Number,
		required: "quantity is required"
	},
	product: {
		type: Schema.Types.ObjectId,
		required: 'product is required',
		ref: "Product",
	},
	owner: {
		type: Schema.Types.ObjectId,
	    ref: "Order",
	    required: "Owner is required"
	}
}, { collection: 'item' });

Item.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Item", Item);
