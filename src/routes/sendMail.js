const route = "/sendMail"
const api = require("../api/sendMail")

module.exports = (router) => {
  router.route(route).post(api.sendWelcomeEmail)
}