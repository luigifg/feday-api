const route = "/logout"
const api = require("../api/logout")

module.exports = (router) => {
  router.route(route).post(api.logout)
}
