const route = "/eventCounts";
const api = require("../api/eventCounts");

module.exports = (router) => {
  console.log("Registrando rota: /eventCounts");
  router.route(route).get(api.get); // Note que removemos a validação de autenticação para debug
};