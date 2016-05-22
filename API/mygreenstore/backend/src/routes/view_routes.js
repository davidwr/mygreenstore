var api = module.exports = require('express').Router()
var request = require('request')
var view = require('../controllers/view')
var user = require('../services/user.js')

api.get('/', view.renderMainView)

api.get('/login', function(req, res) {
  var token = req.get('token');

  request({
    method: 'GET',
    url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    headers: {
      Authorization: 'Bearer ' + token
    }
  }, (error, response, body) => {
    if(error)
      return res.json({ success: false });

    var data = JSON.parse(body);

    console.log(token);
    console.log(data);

    if(data.error)
      return res.json({ success: false });

    user.getOrInsert({ name: data.name, email: data.email, token: token }, function (err, user){
      res.json({ success: true, user: user });
    });
  });
});
