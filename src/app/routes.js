
const baseRoutes = require('./routes/base')
const bookRoutes = require('./routes/book')

module.exports = app => {
  baseRoutes(app)
  bookRoutes(app)
}
