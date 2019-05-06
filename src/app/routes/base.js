
const BaseController = require('../controllers/base')

module.exports = app => {
  app.get(BaseController.routes().home, BaseController.home())
}
