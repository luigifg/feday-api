const route = "/login"
const api = require("../api/login")

module.exports = (router) => {
  router.route(route).post(api.post)
}
