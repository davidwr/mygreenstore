var utils = require('../lib/utils')
var Item = MODELS.Item
var Product = MODELS.Product
var Order = MODELS.order
var ObjectId = require('mongodb').ObjectID;

module.exports = {
  insert: function (item, callback) {
    var errs = utils.requiredFields(item, [
      'price',
      'quantity',
      'product_id',
      'owner'
    ])

    if (Object.keys(errs).length > 0) {
      errs.validationError = true
      return callback(errs)
    }

    var newItem = new Item({ 
      quantity: item.quantity,
      stock: item.stock,
      price: item.price,
      product: item.product_id,
      owner: item.owner
    })

    newItem.save(function (err) {
      if (err) return callback(err)

      Product.findById(item.product_id, function (err, product) {
        if (err) return next(err)

        if (!product) {
          var err = {
            message: 'Product with Id:' + id + ' not founded.',
            notFound : true
          }
          return callback(err)
        }

        if (product.stock < item.quantity) {
          var err = {
            message: 'Product don\'t have stock for this quantity. Product stock: '+product.stock,
            validationError : true
          }
          return callback(err)          
        }

        product.stock = product.stock - item.quantity
        product.save(function (err){
          if (err) return callback(err) 
          return callback(null, newItem)
        })
      })
    })
  }  
}


        

