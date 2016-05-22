module.exports = (done) => {
	var express = require('express');
	var app = express();
	var apiRoutes = require('./routes/api_routes')
  var viewRoutes = require('./routes/view_routes')
  var bodyParser = require('body-parser')
  var cors = require('cors')

  var internalServerError = (err, req, res, next) => {
    function unexpectedError () {
      console.log(err)
      if (err.stack) console.log(err.stack)
      res.status(500).send({
        message: 'Intern Error.',
        error: err
      })
    }

    if (err.authenticationError) return res.status(401).send(err)
    if (err.validationError) return res.status(400).send(err)
    if (err.notFound) return res.status(404).send(err.message)
    unexpectedError()
  }

  app.use(express.static(CONFIG.gui_root))

  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(cors())

  app.use('/', viewRoutes)
  app.use('/api/v1', apiRoutes)
  app.use(internalServerError)

	app.listen(global.CONFIG.port, global.CONFIG.ip, function () {
	  console.log('MyGreenStore API listening on port ' + global.CONFIG.port + '!');
	});

	if (done) done()
}
