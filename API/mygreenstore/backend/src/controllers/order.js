var order = require('../services/order.js')

var insert = (req, res, next) => {
  order.insert(req.body, function (err, data){
    if (err) return next(err)
    res.send(data)
  })
}

var findAll = (req, res, next) => {
  order.findAll(req.body.userid, function (err, data){
    if (err) return next(err)
    res.send(data)
  })
}

var findById = (req, res, next) => {
  order.findById(req.params.id, function (err, data){
    if (err) return next(err)
    res.send(data)
  })
}

var updateStatus = (req, res, next) => {
  order.updateStatus(req.params.id, req.body, function (err, data){
    if (err) return next(err)
    res.send(data)
  })
}

module.exports = {
  insert: insert,
  findAll: findAll,
  findById: findById,
  updateStatus: updateStatus
}
