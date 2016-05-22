"use strict";

var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Schema = mongoose.Schema;

var Product = new Schema({
  description: {
    type: String,
    required: "description is required"
  },
  photo: {
    type: String
  },
  price: {
    type: Number,
    required: "price is required"
  },
  stock: {
    type: Number,
    required: "stock is required"
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "Product owner is required"
  }
}, { collection: 'product' });

Product.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Product", Product);
