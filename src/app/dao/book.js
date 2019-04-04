
class Book {
  constructor (database) {
    this._database = database
  }

  create ({ author, description, price, title }) {
    let books = [author, description, price, title]
    let query = `INSERT INTO book (author, description, price, title) VALUES (?, ?, ?, ?)`
    return new Promise((resolve, reject) => {
      this._database.run(query, books, error => {
        if (error) {
          console.error(error)
          reject('Could not create the book.')
        }
        resolve('Created successfully.')
      })
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      this._database.run('DELETE FROM book WHERE id = ?', id, error => {
        if (error) {
          reject('Could not delete the book.')
        }
        resolve('Deleted successfully.')
      })
    })
  }

  get (id) {
    return new Promise((resolve, reject) => {
      this._database.get('SELECT * FROM book WHERE id = ?', id, (error, book) => {
        if (error) {
          reject('Book not found.')
        }
        resolve(book)
      })
    })
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

  update ({ author, description, id, price, title }) {
    let book = [author, description, price, title, id]
    let query = `UPDATE book SET author = ?, description = ?, price = ?, title = ? WHERE id = ?`
    return new Promise((resolve, reject) => {
      this._database.run(query, book, error => {
        if (error) {
          reject('Could not update the book.')
        }
        resolve('Updated successfully.')
      })
    })
  }
}

module.exports = Book
