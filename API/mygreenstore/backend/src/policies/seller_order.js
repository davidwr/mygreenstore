var Order = MODELS.Order
var ObjectId = require('mongodb').ObjectID;

module.exports = function (req, res, next) {
	var orderId = req.params.id
	var userId = req.body.userid

	Order.findById(orderId).exec(function (err, order) {
      if (err) return next(err)

      if (!order) {
        var err = {
          message: 'Order with Id:' + orderId + ' not founded.',
          notFound : true
        }
        return next(err)
      }

      if (order.seller != userId) {
        var err = {
			message: 'This order no belongs to User with Id: '+userId,
			authenticationError : true
        }
        return next(err)
      }

      return next()
    })
}
