
const templates = require('../views/templates')

class BaseController {
  static home () {
    return (req, res) => {
      res.marko(templates.base.home)
    }
  }

  static routes () {
    return {
      home: '/'
    }
  }
}

module.exports = BaseController
