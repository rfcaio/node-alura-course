
module.exports = app => {
  app.get('/', (req, res) => {
    res.json({ message: 'It works.' })
  })

  app.get('/books', (req, res) => {
    let books = [
      {
        id: '1',
        author: 'H. P. Lovecraft',
        price: 13.99,
        title: 'The call of Cthulhu'
      },
      {
        id: '2',
        author: 'George R. R. Martin',
        price: 11.33,
        title: 'A feast for crows'
      },
      {
        id: '3',
        author: 'Robert E. Howard',
        price: 15.82,
        title: 'The savage tales of Solomon Kane'
      }
    ]
    res.marko(require('./views/books/list.marko'), { books })
  })
}
