
const BaseController = require('../controllers/base')
const BookController = require('../controllers/book')

const Book = require('../models/book')

module.exports = app => {
  app.use(BookController.routes().auth, function (req, res, next) {
    req.isAuthenticated() ? next() : res.redirect(BaseController.routes().login)
  })

  app.get(BookController.routes().list, BookController.getAll())

  app.get(BookController.routes().create, BookController.createForm())

  app.post(BookController.routes().create, Book.validations(), BookController.create())

  app.get(BookController.routes().delete, BookController.delete())

  app.get(BookController.routes().update, BookController.updateForm())

  app.post(BookController.routes().update, BookController.update())
}
