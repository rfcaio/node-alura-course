require('marko/node-require').install()
require('marko/express')

const bodyParser = require('body-parser')
const express = require('express')

const app = express()

app.use('/static', express.static('src/app/public'))

app.use(bodyParser.urlencoded({
  extended: true
}))

require('../app/routes')(app)

app.use((req, res, next) => {
  return res.status(404).marko(require('../app/views/error/404.marko'))
})

/* eslint-disable-next-line handle-callback-err */
app.use((error, req, res, next) => {
  return res.status(500).marko(require('../app/views/error/500.marko'))
})

module.exports = app
