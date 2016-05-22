var utils = require('../lib/utils')
var Product = MODELS.Product
var ObjectId = require('mongodb').ObjectID;

module.exports = {
  insert: function (product, callback) {
    var errs = utils.requiredFields(product, [
      'description',
      'stock',
      'price'
    ])

    if (Object.keys(errs).length > 0) {
      errs.validationError = true
      return callback(errs)
    }

    var newProduct = new Product({
      description: product.description,
      stock: product.stock,
      price: product.price,
      owner: product.userid,
      photo: product.photo
    })

    newProduct.save(function (err) {
      if (err) return callback(err)
      return callback(null, newProduct)
    })
  },

  destroy: function(productId, callback){
    Product.findOneAndRemove({'_id' : productId}, function (err,product){
      if (err) return callback(err)
      return callback(null, product)
    })
  },

  findAll: function (body, callback) {
    Product.find().exec(function (err, products) {
      if (err) return callback(err)
      callback(null, products)
    })
  },

  findAllByOwner: function (owner, callback) {
    Product.find({ owner: owner }).exec(function (err, products) {
      if (err) return callback(err)
      callback(null, products)
    })
  },

  findById: function (productid, callback) {
    Product.findById(productid, function (err, product) {
      if (err) return next(err)

      if (!product) {
        var err = {
          message: 'Product with Id:' + productid + ' not founded.',
          notFound : true
        }
        return callback(err)
      }

      return callback(null, product)
    })
  },

  update: function (productId, body, callback) {
    var errs = utils.requiredFields(body, [
      'description',
      'stock',
      'price'
    ])

    if (Object.keys(errs).length > 0) {
      errs.validationError = true
      return callback(errs)
    }

    var productToUpdate = {
      'description': body.description,
      'stock': body.stock,
      'price': body.price,
      'photo': body.photo
    }

    Product.findByIdAndUpdate(productId, productToUpdate, {new: true}, function(err, product) {
      if (err) return next(err)

      if (!product) {
        var err = {
          message: 'Product with Id:' + productId + ' not founded.',
          notFound : true
        }
        return callback(err)
      }

      return callback(null, product)
    })

  }

}
