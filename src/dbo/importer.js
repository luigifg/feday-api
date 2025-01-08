const { date } = require('joi')
const db = require('../config/db')

const insertTxt = async (os) => {
  try {
    const result = await db('job').insert(os).onConflict('protocolo').merge()
    return result
  } catch (error) {
    console.error('Ocorreu um erro ao inserir os dados:', error)
    return
  }
}

const insertXlsx = async (osMedicao) => {
  try {
    const insertedRows = await db('osMedicao').insert({
      protocolo: osMedicao.protocolo,
      idLocale: osMedicao.idLocale,
      idLocaleInvoicing: osMedicao.idLocaleInvoicing,
      idConstructUnity: osMedicao.idConstructUnity,
      idDistrict: osMedicao.idDistrict,
      idTeam: osMedicao.idTeam,
      idServiceRequested: osMedicao.idServiceRequested,
      performedDate: osMedicao.performedDate,
      idServicePerformed: osMedicao.idServicePerformed,
      idResource: osMedicao.idResource,
      idMos: osMedicao.idMos,
      quantity1: osMedicao.quantity1,
      quantity2: osMedicao.quantity2,
      quantity3: osMedicao.quantity3,
      price: osMedicao.price,
      quantity: osMedicao.quantity,
      value: osMedicao.value,
    })
  } catch (error) {
    console.error(error)
  }
}

const batchInsert = async (array, tableName) => {
  const result = await batchInsert(tableName, array, 100).catch((error) => {
    return null
  })
  return result
}

module.exports = {
  insertTxt,
  insertXlsx,
  batchInsert,
}
