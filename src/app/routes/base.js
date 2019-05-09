
const BaseController = require('../controllers/base')

module.exports = app => {
  app.get(BaseController.routes().home, BaseController.home())

  app.get(BaseController.routes().login, BaseController.loginForm())

  app.post(BaseController.routes().login, BaseController.login())
}
