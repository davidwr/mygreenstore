var path = require('path')
global._ = require('lodash')
var async = require('async')
global.CONFIG = require('./config')()

var loadApi = (done) => {

  async.series([
    (next) => { require('./src/db')(next) },
    (next) => { require('./src/webserver')(next) }
  ], (err) => {
    if (err) throw err
    if (done) done()
  })
}

loadApi()

process.on('uncaughtException', (err) => {
  console.log(err)
  console.log(JSON.stringify(err, null, 2))
  err.stack && console.log(err.stack)
  process.exit(1)
})

if (process.platform === 'win32') {
  var readLine = require('readline')
  var rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.on('SIGINT', () => {
    process.emit('SIGINT')
  })
}

process.on('SIGINT', () => {
  process.exit()
})
