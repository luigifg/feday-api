const dbo = require('../dbo/base')
const { messages } = require('joi-translation-pt-br')
const validation = require('../model/processor')
const tableName = 'processor'

const get = async object => {
  const { limit, page, order, direction, ...filterParams } = object

  // const joins = [
  //   {
  //     joinType: 'leftJoin',
  //     tableJoin: 'screen',
  //     paramTo: 'screen.id',
  //     paramFrom: 'acl.id_screen'
  //   }
  // ]

  const fields = [`${tableName}.*`]

  const filterMap = {
    id: '=',
    operation: 'like',
    priority: 'like',
    status: 'like',
    idUser: 'like',
    bodyRequest: 'like',
    observation: 'like'
  }

  const filters = Object.entries(filterParams).reduce((acc, [key, value]) => {
    if (filterMap[key]) {
      acc.push({ column: key, operator: filterMap[key], value })
    }
    return acc
  }, [])

  processor = await dbo.get(
    tableName,
    filters,
    limit,
    page,
    order,
    direction,
    fields
    // joins
  )

  if (processor && processor.data && processor.data.length > 0) {
    const updatedData = await Promise.all(
      processor.data.map(async item => {
        const user = await dbo.getById(item.idUser, 'user')

        if (user && user.name) {
          item.userName = user.name
        }

        try {
          const bodyRequestObj = JSON.parse(item.bodyRequest)
          if (bodyRequestObj.originalname) {
            item.fileName = bodyRequestObj.originalname
          }
        } catch (err) {
          console.error('Erro ao extrair dados do JSON:', err)
        }

        return item
      })
    )

    processor.data = updatedData
  }

  return processor
}

const insert = async object => {
  try {
    await validation.object.validateAsync(object, {
      abortEarly: false,
      messages: messages
    })
  } catch (error) {
    return error.details.map(el => el.message)
  }

  return await dbo.insert(object, tableName)
}

const update = async (object, id) => {
  if (!id) {
    return false
  }
  if (!object) {
    return false
  }

  return await dbo.update(object, id, tableName)
}

const remove = async id => {
  if (!id) {
    return false
  }
  return await dbo.remove(id, tableName)
}

const getPending = async () => {
  return await dbo.getPendingImporter(tableName)
}

module.exports = {
  get,
  insert,
  update,
  remove,
  getPending
}
