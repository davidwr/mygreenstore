var profile = require('../services/profile.js')

var insert = (req, res, next) => {
  profile.insert(req.body, function (err, data){
    if (err) return next(err)
    res.send(data)
  })
}

var update = (req, res, next) => {
  profile.update(req.params.id, req.body, function (err, data){
    if (err) return next(err)
    res.send(data)
  })
}

var findByUser = (req, res, next) => {
  profile.findByUser(req.body.userid, function (err, data){
    if (err) return next(err)
    res.send(data)
  })
}

module.exports = {
  insert: insert,
  update: update,
  findByUser: findByUser,
}
