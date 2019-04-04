require('marko/node-require').install()
require('marko/express')

const bodyParser = require('body-parser')

const app = require('express')()
app.use(bodyParser.urlencoded({
  extended: true
}))

module.exports = app
