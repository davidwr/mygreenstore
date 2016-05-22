var utils = require('../lib/utils')
var Order = MODELS.Order
var User = MODELS.User
var Product = MODELS.Product
var Garden = MODELS.Garden
var ItemModel = MODELS.Item
var Item = require('../services/item.js')
var ObjectId = require('mongodb').ObjectID;
var async = require('async')

module.exports = {
  insert: function (order, callback) {
    var errs = utils.requiredFields(order, [
      'ship_type',
      'seller',
      'items'
      ])

    if (Object.keys(errs).length > 0) {
      errs.validationError = true
      return callback(errs)
    }

    var newOrder = new Order({
      ship_type: order.ship_type,
      customer: order.userid,
      seller: order.seller,
      status: 'pending',
      ship_address: order.ship_address || '',
    })

    newOrder.save(function (err) {
      if (err) return callback(err)

      if(typeof order.items !== 'object')
        order.items = JSON.parse(order.items);

      async.eachSeries(order.items, function iteratee(item, next) {

        item.owner = newOrder.id
        Item.insert(item, function(err, data){
          if (err) return callback(err)

          newOrder.items.push(data)
          return next()
        })

      }, function (err) {
        if (err) return callback(err)

        newOrder.save(function (err){
          if (err) return callback(err)
          return callback(null, newOrder)
        })
      })
    })
  },

  findAll: function (userid, callback) {
    var populateQuery = [{path:'seller'}, {path:'customer'}];
    Order.find().sort('-createdAt').where({$or :[{seller: userid},{customer: userid}]}).populate('items').exec(function(err, orders) {
      if (err) return callback(err)

        var gardensToPopulate = []

        async.forEach(orders, function(order, done) {
          ItemModel.find().populate('product').where('owner').in([order.id]).exec(function(err, items) {
            order.items = items
              
            Garden.findOne({owner : order.seller}, {}).populate('owner').exec( function(err, garden){
              if (err) return callback(err)
              
              gardensToPopulate.push({
                index: orders.indexOf(order),
                garden: garden
              })

              order.seller = garden.owner
              return done(err)
            })              
          });
        }, function(err) {

          var ordersToReturn = JSON.parse(JSON.stringify(orders))
          for (var i = gardensToPopulate.length - 1; i >= 0; i--) {
            var orderIndex = gardensToPopulate[i].index
            ordersToReturn[orderIndex].garden = gardensToPopulate[i].garden
          }

          return callback(null, ordersToReturn)
        });
    });
  },

  findById: function (orderId, callback) {
    Order.find().where({_id: orderId}).populate('items').exec(function(err, orders) {
      if (err) return callback(err)
        async.forEach(orders, function(order, done) {
          ItemModel.find().where('owner').in([order.id]).exec(function(err, items) {
            order.items = items;
            done(err);
          });
        }, function(err) {
          return callback(null, orders)
        });
    });
  },

  updateStatus: function (orderId, order, callback) {
    var errs = utils.requiredFields(order, [
      'status'
      ])

    if (Object.keys(errs).length > 0) {
      errs.validationError = true
      return callback(errs)
    }

    if ((order.status !== 'canceled') && (order.status !== 'closed')) {
      var err = {
        message: 'For order status only canceled or closed is permitted',
        validationError : true
      }
      return callback(err)
    }

    Order.findByIdAndUpdate(orderId, {status: order.status}, {new: true}, function(err, newOrder) {
      if (err) return next(err)

      if (!newOrder) {
        var err = {
          message: 'Order with Id:' + orderId + ' not founded.',
          notFound : true
        }
        return callback(err)
      }

      if (order.status === 'canceled') {
        Order.find().where({_id: orderId}).populate('items').exec(function(err, orders) {
          if (err) return callback(err)

            async.forEach(orders, function(order, done) {
              ItemModel.find().where('owner').in([order.id]).exec(function(err, items) {
                order.items = items;
                return done(err);
              });
            }, function(err) {
              async.eachSeries(orders[0].items, function iteratee(item, next) {
                Product.find().where({_id: item.product}).exec(function(err, products) {
                  if (err) return next(err)

                  var stock = parseInt(products[0].stock) - parseInt(item.quantity)
                  Product.findByIdAndUpdate(item.product, {stock: stock}, {new: true}, function(err, newProduct) {
                    if (err) return next(err)
                    return next()
                  })
                })
              }, function (err) {
                if (err) return callback(err)
                return callback(null, orders[0])
              })
            });
        });
      } else {
        return callback(null, newOrder)
      }
    })
  }

}
