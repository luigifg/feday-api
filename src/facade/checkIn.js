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

const getCheckInExportData = async (hour, eventId) => {
  if (!hour || !eventId) {
    return [];
  }
  return await dbo.getCheckInExportData(hour, eventId);
};

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

  // Normaliza os campos para ficar compatível com diferentes formatos de nomes de campos
  const userId = object.userId || object.user_id;
  const eventId = object.eventId || object.event_id;
  const { hour } = object;

  // 1. Primeiro, verifica se o usuário já tem qualquer check-in neste horário (mesmo em outros eventos)
  const hourConflictCheck = await dbo.get(
  tableName,
  [
    { column: 'user_id', operator: '=', value: userId },
    { column: 'hour', operator: '=', value: hour }
  ],
  1,
  1,
  null,
  null,
  [`${tableName}.*`]
);

// Se encontrou algum check-in do usuário neste horário
if (hourConflictCheck.total > 0) {
  const conflictingCheckIn = hourConflictCheck.data[0];
  
  // Se o check-in encontrado é para o mesmo evento, é uma duplicata exata
  if (conflictingCheckIn.event_id == eventId) {
    return { 
      success: false, // Mudamos para false para indicar que não é uma nova inserção
      message: 'Check-in já existe para este usuário neste evento e horário',
      status: 409,
      checkIn: conflictingCheckIn,
      isDuplicate: true,
      sameEvent: true  // Flag adicional para indicar que é o mesmo evento
    }
  } 
  // Se o check-in encontrado é para outro evento, é um conflito de horário
  else {
    return { 
      success: false,
      message: 'Usuário já está inscrito em outro evento neste mesmo horário',
      status: 409,
      checkIn: conflictingCheckIn,
      isHourConflict: true,
      conflictEventId: conflictingCheckIn.event_id,
      sameEvent: false  // Flag para indicar que é outro evento
    }
  }
}

  // 2. Se chegou aqui, não há conflito, então prepara o objeto para inserção
  const insertObject = {
    user_id: userId,
    event_id: eventId,
    hour: hour,
    user_name: object.userName || object.user_name,
    admin_id: object.adminId || object.admin_id
  }

  try {
    // Tenta inserir no banco de dados
    const result = await dbo.insert(insertObject, tableName)
    return result
  } catch (dbError) {
    // Captura erros de duplicação no nível do banco de dados (última camada de proteção)
    console.error('Erro ao inserir check-in:', dbError)
    
    // Se for erro de chave duplicada, considera como sucesso mas avisa que já existe
    if (dbError.code === 'ER_DUP_ENTRY') {
      // Verificar novamente para saber se é conflito de hora ou duplicata exata
      const retryCheck = await dbo.get(
        tableName,
        [
          { column: 'user_id', operator: '=', value: userId },
          { column: 'hour', operator: '=', value: hour }
        ],
        1,
        1,
        null,
        null,
        [`${tableName}.*`]
      );
      
      if (retryCheck.total > 0) {
        const existingRecord = retryCheck.data[0];
        if (existingRecord.event_id == eventId) {
          return {
            success: true,
            message: 'Check-in já registrado anteriormente',
            status: 409,
            isDuplicate: true
          }
        } else {
          return {
            success: false,
            message: 'Usuário já está inscrito em outro evento neste mesmo horário',
            status: 409,
            isHourConflict: true,
            conflictEventId: existingRecord.event_id
          }
        }
      }
    }
    
    // Outros erros são repassados
    throw dbError
  }
};

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
  remove,
  getCheckInExportData,
}