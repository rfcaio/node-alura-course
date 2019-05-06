const { validationResult } = require('express-validator/check')

const database = require('../../config/database')

const Book = require('../dao/book')

const templates = require('../views/templates')

class BookController {
  static create () {
    return (req, res) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.marko(templates.book.create, {
          book: req.body,
          validationErrors: errors.array()
        })
      }

      new Book(database).create(req.body)
        .then(response => {
          res.redirect(BookController.routes().list)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  static createForm () {
    return (req, res) => {
      let book = { author: '', description: '', price: '', title: '' }
      res.marko(templates.book.create, { book })
    }
  }

  static delete () {
    return (req, res) => {
      new Book(database).delete(req.params.id)
        .then(response => {
          res.redirect(BookController.routes().list)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  static getAll () {
    return (req, res) => {
      new Book(database).getAll()
        .then(books => {
          res.marko(templates.book.list, { books })
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  static routes () {
    return {
      create: '/book/create',
      delete: '/book/delete/:id',
      list: '/book',
      update: '/book/update/:id'
    }
  }

  static update () {
    return (req, res) => {
      new Book(database).update(req.body)
        .then(response => {
          res.redirect(BookController.routes().list)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  static updateForm () {
    return (req, res) => {
      new Book(database).get(req.params.id)
        .then(book => {
          res.marko(templates.book.update, { book })
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}

module.exports = BookController
