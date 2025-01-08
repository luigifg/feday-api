const db = require("../config/db")

const exportTxt = async (tableName) => {
  const result = await db(tableName)
    .select()
    .where("deleted_at", null)
    .catch((err) => {
      console.log(err.message)
      return []
    })
  return result
}

const exportXlsx = async (tableName) => {
  const result = await db(tableName)
    .select()
    .where("deleted_at", null)
    .catch((err) => {
      console.log(err.message)
      return []
    })
  return result
}

const exportCsv = async (tableName) => {
  const result = await db(tableName)
    .select()
    .where("deleted_at", null)
    .catch((err) => {
      console.log(err.message)
      return []
    })
  return result
}

const exportPdf = async (tableName) => {
  const result = await db(tableName)
    .select()
    .where("deleted_at", null)
    .catch((err) => {
      console.log(err.message)
      return []
    })
  return result
}

module.exports = {
  exportTxt,
  exportXlsx,
  exportCsv,
  exportPdf,
}
