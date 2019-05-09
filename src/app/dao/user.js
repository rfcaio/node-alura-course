
/* eslint-disable prefer-promise-reject-errors */
class User {
  constructor (database) {
    this._database = database
  }

  getByEmail (email) {
    return new Promise((resolve, reject) => {
      this._database.get('SELECT * FROM user WHERE email = ?', email, (error, user) => {
        if (error) {
          reject('User not found.')
        }
        resolve(user)
      })
    })
  }
}

module.exports = User
