var Product = MODELS.Product
var ObjectId = require('mongodb').ObjectID;

module.exports = function (req, res, next) {
	var productid = req.params.id
	var userid = req.body.userid

	Product.findById(productid, function (err, product) {
		if (err) return next(err)

		if (!product) {
      var err = {
        message: 'Product not found for user with Id: ' + userid,
        notFound : true
      }
      return next(err)
    }	

    if (product.owner != userid) {
      var err = {
        message: 'Product not belongs to user with Id: ' + userid,
        authenticationError : true
      }
      return next(err)
    }

		return next()
	})
}
