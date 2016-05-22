var User = MODELS.User;

module.exports = function (req, res, next) {
  var token = req.get('token')
	if (!token) {
		var err = {
			message: 'Token required for authentication',
			authenticationError : true
		}
		return next(err)
	} else {

    User.findOne({ 'token': token }, function (err, userFinded) {
      if (err) return next(err)

			if (!userFinded) {
				var err = {
					message: 'Authentication Failed',
					authenticationError : true
				}
				return next(err)
			}

			if (userFinded.token !== token) {
				var err = {
					message: 'Authentication Failed',
					authenticationError : true
				}
				return next(err)
			}

			req.body.userid = userFinded.id
			return next()
		})
	}
}
