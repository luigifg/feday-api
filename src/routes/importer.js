const route = '/importer'
const api = require('../api/importer')
const auth = require("../api/auth")
const upload = require('../config/multer').upload

module.exports = (router) => {
  router.route(`${route}/txt`).all(auth.validate).post(upload.array('file'), api.importTxt)
  router.route(`${route}/xlsx`).all(auth.validate).post(upload.array('file'), api.importXlsx)
  router.route(`${route}/image`).post(upload.single('file'), api.importImage)
}


