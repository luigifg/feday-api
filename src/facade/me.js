const { object } = require('joi')
const dbo = require('../dbo/base')
const { messages } = require('joi-translation-pt-br')
const tableName = 'user'

const getById = async id => {
  if (!id) {
    return false
  }

  const obj = await dbo.getById(id, tableName)
  if (obj && obj.password) {
    delete obj.password
  }

  return obj
}

module.exports = {
  getById
}
