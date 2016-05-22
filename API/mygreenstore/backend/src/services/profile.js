var utils = require('../lib/utils')
var Profile = MODELS.Profile
var ObjectId = require('mongodb').ObjectID;

module.exports = {
  insert: function (profile, callback) {
    var errs = utils.requiredFields(profile, [
      'name'
    ])

    if (Object.keys(errs).length > 0) {
      errs.validationError = true
      return callback(errs)
    }

    Profile.find().where({owner: profile.userid}).exec(function (err, profileSearch) {
      if (err) return next(err)

      if (profileSearch.length <= 0) {
        var newProfile = new Profile({ 
          name: profile.name,
          owner: profile.userid,
          photo: profile.photo || '',
          phone: profile.phone || ''
        })

        newProfile.save(function (err) {
          if (err) return callback(err)
          return callback(null, newProfile)
        })
      } else {
        var err = {
          message: 'Profile already exists to User Id: '+ profile.userid,
          validationError : true
        }
        return callback(err)          
      }
    })
  },

  findByUser: function (userId, callback) {
    Profile.find().where({owner: userId}).exec(function (err, profile) {
      if (err) return next(err)

      if (!profile) {
        var err = {
          message: 'Profile with User Id:' + userId + ' not founded.',
          notFound : true
        }
        return callback(err)
      }

      return callback(null, profile)
    })
  },

  update: function (profileId, body, callback) {
    var errs = utils.requiredFields(body, [
      'name'
    ])

    if (Object.keys(errs).length > 0) {
      errs.validationError = true
      return callback(errs)
    }

    var profileToUpdate = {
      'name': body.name,
      'photo': body.photo || '',
      'phone': body.phone || ''
    }

    Profile.findByIdAndUpdate(profileId, profileToUpdate, {new: true}, function(err, profile) {
      if (err) return next(err)

      if (!profile) {
        var err = {
          message: 'Profile with Id:' + profileId + ' not founded.',
          notFound : true
        }
        return callback(err)
      }       
      
      return callback(null, profile)
    })

  }
  
}
