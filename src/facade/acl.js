const dbo = require('../dbo/base')
const validation = require('../model/acl')
const { messages } = require('joi-translation-pt-br')
const tableName = 'acl'

const get = async object => {
  const { limit, page, order, direction, ...filterParams } = object

  const joins = [
    {
      joinType: 'leftJoin',
      tableJoin: 'screen',
      paramTo: 'screen.id',
      paramFrom: 'acl.id_screen'
    }
  ]

  const fields = [
    `${tableName}.*`,
    'screen.route as screenRoute',
    'screen.name as screenName'
  ]

  const filterMap = {
    id: '=',
    idGroup: '=',
    idScreen: '=',
    status: '='
  }

  const filters = Object.entries(filterParams).reduce((acc, [key, value]) => {
    if (filterMap[key]) {
      acc.push({ column: key, operator: filterMap[key], value })
    }
    return acc
  }, [])

  return await dbo.get(
    tableName,
    filters,
    limit,
    page,
    order,
    direction,
    fields,
    joins
  )
}

const insert = async object => {
  try {
    await validation.object.validateAsync(object, {
      abortEarly: false,
      messages: messages
    })
  } catch (error) {
    const errors = error.details.map(el => el.message)
    return { errors }
  }

  return await dbo.insert(object, tableName)
}

const update = async (object, id) => {
  if (!id) {
    return false
  }
  try {
    await validation.object.validateAsync(object, {
      abortEarly: false,
      messages: messages
    })
  } catch (error) {
    const errors = error.details.map(el => el.message)
    return { errors }
  }
  return await dbo.update(object, id, tableName)
}

const remove = async id => {
  if (!id) {
    return false
  }
  return await dbo.remove(id, tableName)
}

module.exports = {
  get,
  insert,
  update,
  remove
}
