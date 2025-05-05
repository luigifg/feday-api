const route = "/exportCheckIn";
const api = require("../api/exportCheckIn");
const auth = require("../api/auth");

module.exports = (router) => {
  router.route(route).get(api.getExportData);
};

