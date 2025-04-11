const route = "/eventCounts";
const api = require("../api/eventCounts");
const auth = require("../api/auth");

module.exports = (router) => {
  // console.log("Registrando rota: /eventCounts");
  router.route(route).get(api.get); // Adicionamos o auth.validate
};