
const BookController = require('./book')

const templates = require('../views/templates')

class BaseController {
  static home () {
    return (req, res) => {
      res.marko(templates.base.home)
    }
  }

  static login () {
    return (req, res, next) => {
      req.passport.authenticate('local', (error, user, info) => {
        if (info) {
          return res.marko(templates.base.login)
        }

        if (error) {
          return next(error)
        }

        req.login(user, error => {
          if (error) {
            return next(error)
          }
          return res.redirect(BookController.routes().list)
        })
      })(req, res, next)
    }
  }

  static loginForm () {
    return (req, res) => {
      res.marko(templates.base.login)
    }
  }

  static routes () {
    return {
      home: '/',
      login: '/login'
    }
  }
}

module.exports = BaseController
