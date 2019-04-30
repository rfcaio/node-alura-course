const { check, validationResult } = require('express-validator/check')

const database = require('../config/database')
const Book = require('./dao/book')

module.exports = app => {
  app.get('/', (req, res) => {
    res.marko(require('./views/index.marko'))
  })

  app.get('/book', (req, res) => {
    new Book(database).getAll()
      .then(books => {
        res.marko(require('./views/book/list.marko'), { books })
      })
      .catch(error => {
        console.error(error)
      })
  })

  app.get('/book/create', (req, res) => {
    let book = {
      author: '',
      description: '',
      price: '',
      title: ''
    }
    res.marko(require('./views/book/create.marko'), { book })
  })

  app.post('/book/create', [
    check('title').isLength({ min: 5 }).withMessage('Title is too short.'),
    check('price').isCurrency().withMessage('Price is a currency field.')
  ], (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.marko(require('./views/book/create.marko'), {
        book: req.body,
        validationErrors: errors.array()
      })
    }

    new Book(database).create(req.body)
      .then(response => {
        res.redirect('/book')
      })
      .catch(error => {
        console.error(error)
      })
  })

  app.get('/book/delete/:id', (req, res) => {
    new Book(database).delete(req.params.id)
      .then(response => {
        res.redirect('/book')
      })
      .catch(error => {
        console.error(error)
      })
  })

  app.get('/book/update/:id', (req, res) => {
    new Book(database).get(req.params.id)
      .then(book => {
        res.marko(require('./views/book/update.marko'), { book })
      })
      .catch(error => {
        console.error(error)
      })
  })

  app.post('/book/update/:id', (req, res) => {
    new Book(database).update(req.body)
      .then(response => {
        res.redirect('/book')
      })
      .catch(error => {
        console.error(error)
      })
  })
}
