const { check } = require('express-validator/check')

class Book {
  static validations () {
    return [
      check('title').isLength({ min: 5 }).withMessage('Title is too short.'),
      check('price').isCurrency().withMessage('Price is a currency field.')
    ]
  }
}

module.exports = Book
