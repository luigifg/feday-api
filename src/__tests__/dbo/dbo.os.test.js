const request = require('supertest')
const app = require('../../app')
require('dotenv').config({ path: '.env.test' })
const dbo = require('../../dbo/base')
const { messages } = require('joi-translation-pt-br')
const tableName = 'os'

describe('Testes do banco de dados', () => {
  test('INSERT', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      idLocale: 1,
      idLocaleInvoicing: 1,
      idTeam: 1,
      idServiceRequested: 1,
      idServicePerformed: 1,
      idResource: 1,
      idMos: 1,
      idDistrict: 1,
      idConstructUnity: 1,
      performedDate: new Date(),
      protocolo: 1,
      observation: 'Observation Example',
      valueC: 10.0,
      valueL: 10.0,
      valueP: 10.0,
      quantity: 10.0,
      value: 10.0,
    }
    const result = await dbo.insert(object, tableName)
    expect(result).toEqual([2])
  })

  test('INSERT + GET ALL', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      idLocale: 1,
      idLocaleInvoicing: 1,
      idTeam: 1,
      idServiceRequested: 1,
      idServicePerformed: 1,
      idResource: 1,
      idMos: 1,
      idDistrict: 1,
      idConstructUnity: 1,
      performedDate: new Date(),
      protocolo: 1,
      observation: 'Observation Example',
      valueC: 10.0,
      valueL: 10.0,
      valueP: 10.0,
      quantity: 10.0,
      value: 10.0,
    }

    await dbo.insert(object, tableName)

    const result = await dbo.get(tableName)
    expect(result).toHaveLength(2)
    result.forEach((obj) => {
      expect(obj).toHaveProperty('id')
      expect(obj).toHaveProperty('idLocale')
      expect(obj).toHaveProperty('idLocaleInvoicing')
      expect(obj).toHaveProperty('idTeam')
      expect(obj).toHaveProperty('idServiceRequested')
      expect(obj).toHaveProperty('idServicePerformed')
      expect(obj).toHaveProperty('idResource')
      expect(obj).toHaveProperty('idMos')
      expect(obj).toHaveProperty('idDistrict')
      expect(obj).toHaveProperty('idConstructUnity')
      expect(obj).toHaveProperty('performedDate')
      expect(obj).toHaveProperty('protocolo')
      expect(obj).toHaveProperty('observation')
      expect(obj).toHaveProperty('valueC')
      expect(obj).toHaveProperty('valueL')
      expect(obj).toHaveProperty('valueP')
      expect(obj).toHaveProperty('quantity')
      expect(obj).toHaveProperty('value')
      expect(obj).toHaveProperty('createdAt')
      expect(obj).toHaveProperty('updatedAt')
      expect(obj).toHaveProperty('deletedAt')
    })
  })

  test('GET BY ID', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const result = await dbo.getById(1, tableName)

    expect(result).toHaveProperty('id', 1)
    expect(result).toHaveProperty('idLocale', 1)
    expect(result).toHaveProperty('idLocaleInvoicing', 1)
    expect(result).toHaveProperty('idTeam', 1)
    expect(result).toHaveProperty('idServiceRequested', 1)
    expect(result).toHaveProperty('idServicePerformed', 1)
    expect(result).toHaveProperty('idResource', 1)
    expect(result).toHaveProperty('idMos', 1)
    expect(result).toHaveProperty('idDistrict', 1)
    expect(result).toHaveProperty('idConstructUnity', 1)
    expect(result).toHaveProperty('performedDate')
    expect(result).toHaveProperty('protocolo', 1)
    expect(result).toHaveProperty('observation', 'Observation Example')
    expect(result).toHaveProperty('valueC', 10.0)
    expect(result).toHaveProperty('valueL', 10.0)
    expect(result).toHaveProperty('valueP', 10.0)
    expect(result).toHaveProperty('quantity', 10.0)
    expect(result).toHaveProperty('value', 10.0)
    expect(result).toHaveProperty('createdAt')
    expect(result).toHaveProperty('updatedAt')
    expect(result).toHaveProperty('deletedAt')
  })

  test('UPDATE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      idLocale: 1,
      idLocaleInvoicing: 1,
      idTeam: 1,
      idServiceRequested: 1,
      idServicePerformed: 1,
      idResource: 1,
      idMos: 1,
      idDistrict: 1,
      idConstructUnity: 1,
      performedDate: new Date(),
      protocolo: 1,
      observation: 'Observation Example 2',
      valueC: 10.0,
      valueL: 10.0,
      valueP: 10.0,
      quantity: 10.0,
      value: 10.0,
    }

    await dbo.update(object, 1, tableName)

    const result = await dbo.getById(1, tableName)

    expect(result).toHaveProperty('id', 1)
    expect(result).toHaveProperty('idLocale', 1)
    expect(result).toHaveProperty('idLocaleInvoicing', 1)
    expect(result).toHaveProperty('idTeam', 1)
    expect(result).toHaveProperty('idServiceRequested', 1)
    expect(result).toHaveProperty('idServicePerformed', 1)
    expect(result).toHaveProperty('idResource', 1)
    expect(result).toHaveProperty('idMos', 1)
    expect(result).toHaveProperty('idDistrict', 1)
    expect(result).toHaveProperty('idConstructUnity', 1)
    expect(result).toHaveProperty('performedDate')
    expect(result).toHaveProperty('protocolo', 1)
    expect(result).toHaveProperty('observation', 'Observation Example 2')
    expect(result).toHaveProperty('valueC', 10.0)
    expect(result).toHaveProperty('valueL', 10.0)
    expect(result).toHaveProperty('valueP', 10.0)
    expect(result).toHaveProperty('quantity', 10.0)
    expect(result).toHaveProperty('value', 10.0)
    expect(result).toHaveProperty('createdAt')
    expect(result).toHaveProperty('updatedAt')
    expect(result).toHaveProperty('deletedAt')
  })

  test('SEARCH PADRÃO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      idLocale: 1,
      idLocaleInvoicing: 1,
      idTeam: 1,
      idServiceRequested: 1,
      idServicePerformed: 1,
      idResource: 1,
      idMos: 1,
      idDistrict: 1,
      idConstructUnity: 1,
      protocolo: 1,
      observation: 'Observation Example',
      valueC: 10.0,
      valueL: 10.0,
      valueP: 10.0,
      quantity: 10.0,
      value: 10.0,
    }

    const params = [{ column: 'id', signal: '=', value: 1 }]
    result = await dbo.search(tableName, params)
    expect(result).toMatchObject([object])
  })

  test('SEARCH AND', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      idLocale: 1,
      idLocaleInvoicing: 1,
      idTeam: 1,
      idServiceRequested: 1,
      idServicePerformed: 1,
      idResource: 1,
      idMos: 1,
      idDistrict: 1,
      idConstructUnity: 1,
      protocolo: 1,
      observation: 'Observation Example',
      valueC: 10.0,
      valueL: 10.0,
      valueP: 10.0,
      quantity: 10.0,
      value: 10.0,
    }

    const params = [{ column: 'id', signal: '=', value: 1, operator: 'AND' }]
    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('SEARCH OR', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      idLocale: 1,
      idLocaleInvoicing: 1,
      idTeam: 1,
      idServiceRequested: 1,
      idServicePerformed: 1,
      idResource: 1,
      idMos: 1,
      idDistrict: 1,
      idConstructUnity: 1,
      protocolo: 1,
      observation: 'Observation Example',
      valueC: 10.0,
      valueL: 10.0,
      valueP: 10.0,
      quantity: 10.0,
      value: 10.0,
    }

    const params = [{ column: 'id', signal: '=', value: 1, operator: 'OR' }]
    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('SEARCH LIKE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      idLocale: 1,
      idLocaleInvoicing: 1,
      idTeam: 1,
      idServiceRequested: 1,
      idServicePerformed: 1,
      idResource: 1,
      idMos: 1,
      idDistrict: 1,
      idConstructUnity: 1,
      protocolo: 1,
      observation: 'Observation Example',
      valueC: 10.0,
      valueL: 10.0,
      valueP: 10.0,
      quantity: 10.0,
      value: 10.0,
    }

    const params = [{ column: 'id', signal: '=', value: 1, operator: 'LIKE' }]
    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('INSERT + SEARCH IN', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      idLocale: 1,
      idLocaleInvoicing: 1,
      idTeam: 1,
      idServiceRequested: 1,
      idServicePerformed: 1,
      idResource: 1,
      idMos: 1,
      idDistrict: 1,
      idConstructUnity: 1,
      protocolo: 1,
      observation: 'Observation Example 2',
      valueC: 10.0,
      valueL: 10.0,
      valueP: 10.0,
      quantity: 10.0,
      value: 10.0,
    }
    await dbo.insert(object, tableName)

    const params = [
      {
        column: 'observation',
        signal: '=',
        value: ['Observation Example', 'Observation Example 2'],
        operator: 'IN',
      },
    ]

    result = await dbo.search(tableName, params)

    expect(result).toHaveLength(2)
  })

  test('DELETE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    await dbo.remove(1, tableName)

    const result = await dbo.get(tableName)
    expect(result).toHaveLength(0)
  })

  test('CLEAR', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    await dbo.clear(tableName)

    const result = await dbo.get(tableName)
    expect(result).toHaveLength(0)
  })

  test('INSERT INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = { teste: 'Teste' }
    const result = await dbo.insert(object, tableName)
    expect(result.errors)
  })

  test('GET VAZIO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    await dbo.clear(tableName)

    const result = await dbo.get('teste')
    expect(result).toHaveLength(0)
  })

  test('GET BY ID INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const result = await dbo.getById(2, tableName)
    expect(result).toBe(undefined)
  })

  test('UPDATE INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      TESTE: 'TESTE',
    }

    result = await dbo.update(object, 1, tableName)
    expect(result.errors)
  })

  test('SEARCH PADRÃO INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const params = [{ column: 'id', signal: '=', value: 2 }]
    result = await dbo.search(tableName, params)

    expect(result).toStrictEqual([])
  })

  test('SEARCH AND INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const params = [{ column: 'Aleatorio', signal: '=', value: 'Aleatorio', operator: 'AND' }]
    result = await dbo.search(tableName, params)

    expect(result).toBe(false)
  })

  test('SEARCH OR INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const params = [{ column: 'Aleatorio', signal: '=', value: 'Aleatorio', operator: 'OR' }]
    result = await dbo.search(tableName, params)

    expect(result).toBe(false)
  })

  test('SEARCH LIKE INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })
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

  test('SEARCH IN INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

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

  test('DELETE INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    result = await dbo.remove(2, tableName)

    expect(result).toBe(0)
  })
})
