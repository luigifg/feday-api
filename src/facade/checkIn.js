const dbo = require('../dbo/base')
const { messages } = require('joi-translation-pt-br')
const validation = require('../model/checkIn')
const tableName = 'check_in'

const get = async object => {
  const { limit, page, order, direction, user_id, event_id, hour, ...filterParams } = object

  const fields = [`${tableName}.*`]

  const filterMap = {
    id: '=',
    name: 'like',
    route: 'like',
    order: 'like'
  }

  // Se tiver os parâmetros de verificação de check-in, cria os filtros específicos
  if (user_id && event_id && hour) {
    const filters = [
      { column: 'user_id', operator: '=', value: user_id },
      { column: 'event_id', operator: '=', value: event_id },
      { column: 'hour', operator: '=', value: hour }
    ]

    const result = await dbo.get(
      tableName,
      filters,
      1,
      1,
      order,
      direction,
      fields
    )

    return {
      exists: result.total > 0,
      checkIn: result.data[0] || null
    }
  }

  // Caso contrário, segue com a busca normal
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
    fields
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

  // Verifica se já existe check-in
  const checkResult = await get({
    user_id: object.user_id,
    event_id: object.event_id,
    hour: object.hour
  })

  if (checkResult.exists) {
    return { 
      error: true, 
      message: 'Check-in já existe para este usuário neste evento e horário',
      status: 409
    }
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