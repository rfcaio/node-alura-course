const passport = require('passport')
const session = require('express-session')
const uuid = require('uuid/v4')

const LocalStrategy = require('passport-local').Strategy

const database = require('./database')

const UserDao = require('../app/dao/user')

module.exports = app => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    new UserDao(database).getByEmail(email)
      .then(user => {
        if (!user || password !== user.password) {
          return done(null, false, {
            message: 'Could not find the user.'
          })
        }
        return done(null, user)
      })
      .catch(error => {
        return done(error, false)
      })
  }))

  passport.serializeUser((user, done) => {
    const { email, name } = user
    const userSession = { email, name }
    done(null, userSession)
  })

  passport.deserializeUser((userSession, done) => {
    done(null, userSession)
  })

  app.use(session({
    secret: 'foo-bar-tar',
    genid: req => uuid(),
    resave: false,
    saveUninitialized: false
  }))

  app.use(passport.initialize())

  app.use(passport.session())

  app.use((req, res, next) => {
    req.passport = passport
    next()
  })
}
