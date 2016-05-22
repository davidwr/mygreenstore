var utils = require('../lib/utils')
var User = MODELS.User
var ObjectId = require('mongodb').ObjectID;

module.exports = {
  getOrInsert: function (user, callback) {
    var errs = utils.requiredFields(user, [
      'email',
      'token'
    ])

    if (Object.keys(errs).length > 0) {
      errs.validationError = true
      return callback(errs)
    }

    User.findOne({ email: user.email }, (err, existentUser) => {
      console.log('existentUser', existentUser);

      if (err) return callback(err)
      if (existentUser) return callback(null, existentUser)

      var newUser = new User(user);
      newUser.save((err) => {
        console.log('newUser', newUser);
        if (err) return callback(err)
        callback(null, newUser)
      })
    })
  }
}
