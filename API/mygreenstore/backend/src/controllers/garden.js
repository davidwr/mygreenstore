var garden = require('../services/garden.js')
var product = require('../services/product.js')

var insert = (req, res, next) => {
  var newGarden = req.body;
  newGarden.owner = req.body.userid;

  garden.insert(newGarden, function (err, data){
    if (err) return next(err)
    res.send(data)
  })
}

var getNear = (req, res, next) => {
  var conditions = {};
  conditions.userLocation = [ req.query.latitude, req.query.longitude ];
  conditions.maxDistance = req.query.max_distance;
  conditions.skip = req.query.skip;
  conditions.limit = req.query.limit;

  garden.getNear(conditions, function (err, data) {
    if (err) return next(err)
    res.send(data)
  });
}

var getById = (req, res, next) => {
  garden.getById(req.params.id, function (err, data) {
    if (err) return next(err)
    res.send(data)
  });
}

var getProducts = (req, res, next) => {
  garden.getById(req.params.id, function (err, garden) {
    if (err) return next(err)

    product.findAllByOwner(garden.owner, function (err, products){
      if (err) return next(err)

      res.send(products)
    });
  });
}

var update = (req, res, next) => {
  garden.update(req.params.id, req.body, function (err, data) {
    if (err) return next(err)
    res.send(data)
  });
}

var findByUser = (req, res, next) => {
  garden.findByUser(req.body.userid, function (err, data){
    if (err) return next(err)
    res.send(data)
  })
}

module.exports = {
  insert: insert,
  getNear: getNear,
  getById: getById,
  getProducts: getProducts,
  update: update,
  findByUser: findByUser
}
