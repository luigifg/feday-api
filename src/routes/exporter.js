const route = "/exporter"
const api = require("../api/exporter")

module.exports = (router) => {
  router.route(`${route}/txt`).get(api.exportTxt)
  router.route(`${route}/xlsx`).get(api.exportXlsx)
  router.route(`${route}/csv`).get(api.exportCsv)
  router.route(`${route}/pdf`).get(api.exportPdf)
}
