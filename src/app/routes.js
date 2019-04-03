
const database = require('../config/database')
const Book = require('./dao/book')

module.exports = app => {
  app.get('/', (req, res) => {
    res.marko(require('./views/index.marko'))
  })

  app.get('/books', (req, res) => {
    new Book(database).getAll()
      .then(books => {
        res.marko(require('./views/books/list.marko'), { books })
      })
      .catch(error => {
        console.error(err)
      })
  })
}
