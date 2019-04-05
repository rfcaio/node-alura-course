require('marko/node-require').install()
require('marko/express')

const bodyParser = require('body-parser')
const express = require('express')

const app = express()

app.use('/static', express.static('src/app/public'))

app.use(bodyParser.urlencoded({
  extended: true
}))

module.exports = app
