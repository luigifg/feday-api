const facade = require("../facade/exporter")

const exportTxt = async (req, res) => {
  const object = req.query

  const result = await facade.exportTxt(object)
  return res.status(200).send(result)
}

const exportXlsx = async (req, res) => {
  const object = req.query

  const result = await facade.exportXlsx(object)
  return res.status(200).send(result)
}

const exportCsv = async (req, res) => {
  const object = req.query

  const result = await facade.exportCsv(object)
  return res.status(200).send(result)
}

const exportPdf = async (req, res) => {
  const object = req.query

  const result = await facade.exportPdf(object)
  return res.status(200).send(result)
}

module.exports = {
  exportTxt,
  exportXlsx,
  exportCsv,
  exportPdf,
}
