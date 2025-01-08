const route = "/validatePassword"
const api = require("../api/validatePassword")

module.exports = (router) => {
  router.route(route).post(api.post)
}
