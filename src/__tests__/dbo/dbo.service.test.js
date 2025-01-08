const request = require('supertest')
const app = require('../../app')
require('dotenv').config({ path: '.env.test' })
const dbo = require('../../dbo/base')
const { messages } = require('joi-translation-pt-br')
const tableName = 'service'

describe('Testes do banco de dados', () => {
  test('INSERT', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    const result = await dbo.insert(object, tableName)
    expect(result).toEqual([188])
  })

  test('INSERT 2 + GET ALL', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object1, tableName)

    const object2 = {
      externalCode: 123456,
      name: 'Segundo nome',
      description: 'caixa de texto 2',
      serviceGroup: 'grupo de serviço 2',
      criteria: 'criteria 2',
      defaultTime: '12',
      teamType: 23,
      priority: 34,
      time: 45,
    }
    await dbo.insert(object2, tableName)

    const result = await dbo.get(tableName)
    expect(result).toHaveLength(189)
    result.forEach((obj) => {
      expect(obj).toHaveProperty('id')
      expect(obj).toHaveProperty('externalCode')
      expect(obj).toHaveProperty('name')
      expect(obj).toHaveProperty('description')
      expect(obj).toHaveProperty('serviceGroup')
      expect(obj).toHaveProperty('criteria')
      expect(obj).toHaveProperty('defaultTime')
      expect(obj).toHaveProperty('teamType')
      expect(obj).toHaveProperty('priority')
      expect(obj).toHaveProperty('time')
      expect(obj).toHaveProperty('createdAt')
      expect(obj).toHaveProperty('updatedAt')
      expect(obj).toHaveProperty('deletedAt')
    })
  })

  test('INSERT + GET BY ID', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object1, tableName)

    const result = await dbo.getById(189, tableName)

    expect(result).toHaveProperty('id', 189)
    expect(result).toHaveProperty('externalCode', 123)
    expect(result).toHaveProperty('name', 'primeiro nome')
    expect(result).toHaveProperty('description', 'caixa de texto')
    expect(result).toHaveProperty('serviceGroup', 'grupo de serviço')
    expect(result).toHaveProperty('criteria', 'criteria')
    expect(result).toHaveProperty('defaultTime', '1')
    expect(result).toHaveProperty('teamType', 2)
    expect(result).toHaveProperty('priority', 3)
    expect(result).toHaveProperty('time', 4)
    expect(result).toHaveProperty('createdAt')
    expect(result).toHaveProperty('updatedAt')
    expect(result).toHaveProperty('deletedAt')
  })

  test('INSERT + UPDATE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object1, tableName)

    const resultGet = await dbo.getById(189, tableName)

    expect(resultGet).toHaveProperty('id', 189)
    expect(resultGet).toHaveProperty('externalCode', 123)
    expect(resultGet).toHaveProperty('name', 'primeiro nome')
    expect(resultGet).toHaveProperty('description', 'caixa de texto')
    expect(resultGet).toHaveProperty('serviceGroup', 'grupo de serviço')
    expect(resultGet).toHaveProperty('criteria', 'criteria')
    expect(resultGet).toHaveProperty('defaultTime', '1')
    expect(resultGet).toHaveProperty('teamType', 2)
    expect(resultGet).toHaveProperty('priority', 3)
    expect(resultGet).toHaveProperty('time', 4)
    expect(resultGet).toHaveProperty('createdAt')
    expect(resultGet).toHaveProperty('updatedAt')
    expect(resultGet).toHaveProperty('deletedAt')

    const object2 = {
      externalCode: 123456,
      name: 'Segundo nome',
      description: 'caixa de texto 2',
      serviceGroup: 'grupo de serviço 2',
      criteria: 'criteria 2',
      defaultTime: 12,
      teamType: 23,
      priority: 34,
      time: 45,
    }

    await dbo.update(object2, 2, tableName)

    const resultGet2 = await dbo.getById(2, tableName)

    expect(resultGet2).toHaveProperty('id', 2)
    expect(resultGet2).toHaveProperty('externalCode', 123456)
    expect(resultGet2).toHaveProperty('name', 'Segundo nome')
    expect(resultGet2).toHaveProperty('description', 'caixa de texto 2')
    expect(resultGet2).toHaveProperty('serviceGroup', 'grupo de serviço 2')
    expect(resultGet2).toHaveProperty('criteria', 'criteria 2')
    expect(resultGet2).toHaveProperty('defaultTime', '12')
    expect(resultGet2).toHaveProperty('teamType', 23)
    expect(resultGet2).toHaveProperty('priority', 34)
    expect(resultGet2).toHaveProperty('time', 45)
    expect(resultGet2).toHaveProperty('createdAt')
    expect(resultGet2).toHaveProperty('updatedAt')
    expect(resultGet2).toHaveProperty('deletedAt')
  })

  test('INSERT + SEARCH PADRÃO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: 1,
      teamType: 2,
      priority: 3,
      time: 4,
    }

    await dbo.insert(object, tableName)

    const params = [{ column: 'externalCode', signal: '=', value: 123 }]
    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('INSERT + SEARCH AND', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'externalCode', signal: '=', value: '123', operator: 'AND' }]
    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('INSERT + SEARCH OR', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'externalCode', signal: '=', value: '123', operator: 'OR' }]
    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('INSERT + SEARCH LIKE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'name', signal: '=', value: 'primeiro', operator: 'LIKE' }]

    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('INSERT + SEARCH IN', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object1, tableName)

    const object2 = {
      externalCode: 123456,
      name: 'Segundo nome',
      description: 'caixa de texto 2',
      serviceGroup: 'grupo de serviço 2',
      criteria: 'criteria 2',
      defaultTime: '12',
      teamType: 23,
      priority: 34,
      time: 45,
    }
    await dbo.insert(object2, tableName)

    const params = [
      {
        column: 'name',
        signal: '=',
        value: ['primeiro nome', 'Segundo nome'],
        operator: 'IN',
      },
    ]

    result = await dbo.search(tableName, params)

    expect(result).toHaveLength(2)
  })

  test('INSERT + GET + DELETE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object1, tableName)

    const result = await dbo.get(tableName)
    expect(result).toHaveLength(189)

    await dbo.remove(189, tableName)

    const result2 = await dbo.get(tableName)
    expect(result2).toHaveLength(188)
  })

  test('INSERT + GET + CLEAR', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object1, tableName)

    const result = await dbo.get(tableName)
    expect(result).toHaveLength(189)

    await dbo.clear(tableName)

    const result2 = await dbo.get(tableName)
    expect(result2).toHaveLength(0)
  })

  test('INSERT INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = { teste: 'serviço' }
    const result = await dbo.insert(object, tableName)
    expect(result.errors)
  })

  test('GET VAZIO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const result = await dbo.get('teste')
    expect(result).toHaveLength(0)
  })

  test('INSERT + GET BY ID INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: 1,
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object1, tableName)

    const result = await dbo.getById(1000, tableName)
    expect(result).toBe(undefined)
  })

  test('INSERT + UPDATE INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object1, tableName)

    const resultGet = await dbo.getById(189, tableName)

    expect(resultGet).toHaveProperty('id', 2)
    expect(resultGet).toHaveProperty('externalCode', 123)
    expect(resultGet).toHaveProperty('name', 'primeiro nome')
    expect(resultGet).toHaveProperty('description', 'caixa de texto')
    expect(resultGet).toHaveProperty('serviceGroup', 'grupo de serviço')
    expect(resultGet).toHaveProperty('criteria', 'criteria')
    expect(resultGet).toHaveProperty('defaultTime', '1')
    expect(resultGet).toHaveProperty('teamType', 2)
    expect(resultGet).toHaveProperty('priority', 3)
    expect(resultGet).toHaveProperty('time', 4)

    const object2 = {
      externalCode: '123456',
      name: 'Segundo nome',
      description: 'caixa de texto 2',
      serviceGroup: 'grupo de serviço 2',
      criteria: 'criteria 2',
      defaultTime: '12',
      teamType: '23',
      priority: '34',
      time: '45',
      TESTE: '12345',
    }

    result = await dbo.update(object2, 2, tableName)
    expect(result.errors)
  })

  test('INSERT + SEARCH PADRÃO INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'Aleatorio', signal: '=', value: 'Aleatorio' }]
    result = await dbo.search(tableName, params)

    expect(result).toBe(false)
  })

  test('INSERT + SEARCH AND INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'Aleatorio', signal: '=', value: 'Aleatorio', operator: 'AND' }]
    result = await dbo.search(tableName, params)

    expect(result).toBe(false)
  })

  test('INSERT + SEARCH OR INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'Aleatorio', signal: '=', value: 'Aleatorio', operator: 'OR' }]
    result = await dbo.search(tableName, params)

    expect(result).toBe(false)
  })

  test('INSERT + SEARCH LIKE INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object, tableName)

    const params = [
      {
        column: 'Aleatorio',
        signal: '=',
        value: 'Aleatorio',
        operator: 'LIKE',
      },
    ]
    result = await dbo.search(tableName, params)

    expect(result).toBe(false)
  })

  test('2 INSERT + SEARCH IN INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object1, tableName)

    const object2 = {
      externalCode: 123456,
      name: 'Segundo nome',
      description: 'caixa de texto 2',
      serviceGroup: 'grupo de serviço 2',
      criteria: 'criteria 2',
      defaultTime: '12',
      teamType: 23,
      priority: 34,
      time: 45,
    }
    await dbo.insert(object2, tableName)

    const params = [
      {
        column: 'Aleatorio',
        signal: '=',
        value: ['Aleatorio', 'Aleatorio'],
        operator: 'IN',
      },
    ]

    result = await dbo.search(tableName, params)

    expect(result).toBe(false)
  })

  test('INSERT + DELETE INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      externalCode: 123,
      name: 'primeiro nome',
      description: 'caixa de texto',
      serviceGroup: 'grupo de serviço',
      criteria: 'criteria',
      defaultTime: '1',
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await dbo.insert(object1, tableName)

    result = await dbo.remove(2, tableName)

    expect(result).toBe(1)
  })
})
