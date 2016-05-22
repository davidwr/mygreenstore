var product = require('../services/product.js')

var insert = (req, res, next) => {
  product.insert(req.body, function (err, data){
    if (err) return next(err)
    res.send(data)
  })
}

var update = (req, res, next) => {
  product.update(req.params.id, req.body, function (err, data){
    if (err) return next(err)
    res.send(data)
  })
}

var destroy = (req, res, next) => {
  product.destroy(req.params.id, function (err, data){
    if (err) return next(err)
    res.send(data)
  })
}

var findAll = (req, res, next) => {
  product.findAll(req.body, function (err, data){
    if (err) return next(err)
    res.send(data)
  })
}

var findById = (req, res, next) => {
  product.findById(req.params.id, function (err, data){
    if (err) return next(err)
    res.send(data)
  })
}

module.exports = {
  insert: insert,
  update: update,
  destroy: destroy,
  findAll: findAll,
  findById: findById
}
