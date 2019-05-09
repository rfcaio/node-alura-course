require('marko/node-require').install()
require('marko/express')

const bodyParser = require('body-parser')
const express = require('express')

const app = express()

const templates = require('../app/views/templates')

app.use('/static', express.static('src/app/public'))

app.use(bodyParser.urlencoded({
  extended: true
}))

require('./session')(app)
require('../app/routes')(app)

app.use((req, res, next) => {
  return res.status(404).marko(templates.error.error404)
})

/* eslint-disable-next-line handle-callback-err */
app.use((error, req, res, next) => {
  return res.status(500).marko(templates.error.error500)
})

module.exports = app
