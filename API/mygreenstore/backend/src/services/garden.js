var utils = require('../lib/utils')
var Garden = MODELS.Garden
var ObjectId = require('mongodb').ObjectID;

module.exports = {
  insert: function (garden, callback) {
    var errs = utils.requiredFields(garden, [
      'name',
      'location',
      'owner',
      'address'
    ])

    if (Object.keys(errs).length > 0) {
      errs.validationError = true
      return callback(errs)
    }

    var newGarden = new Garden(garden);

    newGarden.save(function (err) {
      if (err) return callback(err)
      callback(null, newGarden)
    });
  },

  update: function (gardenId, body, callback) {
    var errs = utils.requiredFields(body, [
      'name',
      'location',
      'address'
    ])

    if (Object.keys(errs).length > 0) {
      errs.validationError = true
      return callback(errs)
    }

    var gardenToUpdate = {
      name: body.name,
      location: body.location,
      photo: body.photo || '',
      address: body.address || '',
      phone: body.phone || '',
      deliveryDays: body.deliveryDays || ''
    }

    Garden.findByIdAndUpdate(gardenId, gardenToUpdate, {new: true}, function(err, garden) {
      if (err) return next(err)

      if (!garden) {
        var err = {
          message: 'Garden with Id:' + gardenId + ' not founded.',
          notFound : true
        }
        return callback(err)
      }       
      
      return callback(null, garden)
    })
  },

  findByUser: function (userId, callback) {
    console.log(userId)
    Garden.find().where({owner: userId}).exec(function (err, garden) {
      if (err) return next(err)

      if (!garden) {
        var err = {
          message: 'Garden with User Id:' + userId + ' not founded.',
          notFound : true
        }
        return callback(err)
      }

      return callback(null, garden)
    })
  },

  getNear: function (conditions, callback) {
    var userLocation = conditions.userLocation;
    var maxDistance = conditions.maxDistance || 1000;
    var skip = conditions.skip || 0;
    var limit = conditions.limit || 100;

    Garden.find({
			location: {
				'$nearSphere': {
					'$geometry': {
						type: "Point",
						coordinates: [ parseFloat(userLocation[0]), parseFloat(userLocation[1]) ]
					},
					'$maxDistance': parseInt(maxDistance)
				}
			}
		})
		.skip(parseInt(skip))
		.limit(parseInt(limit))
		.exec(function(err, gardens){
			if (err)
				return callback(err);

			return callback(null, gardens);
		});
  },

  getById: function(id, callback) {
    Garden.findById(id, function(err, garden) {
      if (err)
        return callback(err);

      return callback(null, garden);
    })
  }
}
