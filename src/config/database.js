const sqlite3 = require('sqlite3').verbose()

const database = new sqlite3.Database('database.db')

database.serialize(() => {
  database.run('PRAGMA foreign_keys=ON')

  database.run(`
    CREATE TABLE IF NOT EXISTS book (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author TEXT NOT NULL,
      description TEXT DEFAULT ('') NOT NULL,
      price REAL NOT NULL,
      title TEXT NOT NULL
    )
  `)
})

process.on('SIGINT', () => {
  database.close(() => {
    process.exit(0)
  })
})

module.exports = database
