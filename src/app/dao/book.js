
class Book {
  constructor (database) {
    this._database = database
  }

  getAll () {
    return new Promise((resolve, reject) => {
      this._database.all('SELECT * FROM book', (error, books) => {
        if (error) {
          console.error(error)
          reject('Could not load books.')
        }
        resolve(books)
      })
    })
  }
}

module.exports = Book
