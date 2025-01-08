const route = '/me'
const api = require('../api/me')
const auth = require('../api/auth')

module.exports = (router) => {
  router.route(route).all(auth.validate).get(api.getById)
}
