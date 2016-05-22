"use strict";

var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Schema = mongoose.Schema;

var Order = new Schema({
	items: {
		type: [Schema.Types.ObjectId],
		ref: 'Item'
	},
	seller: {
		type: Schema.Types.ObjectId,
		required: 'seller is required',
		ref: "User",
	},
	customer: {
		type: Schema.Types.ObjectId,
		required: 'customer is required',
		ref: "User",
	},
	ship_address: {
		type: String
	},
	ship_type: {
		type: String,
		required: 'ship_type is required'
	},
	status: {
		type: String,
		required: 'status is required'
	}
}, { collection: 'order' });

Order.set('toJSON', { virtuals: true });

Order.virtual('createdAt').get(function(){
	return new Date(this._id.getTimestamp());
});

module.exports = mongoose.model("Order", Order);
