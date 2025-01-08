const { object } = require('joi')
const request = require('supertest')
const app = require('../../app')
require('dotenv').config({ path: '.env.test' })
const facade = require('../../facade/os')

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

    const result = await facade.insert(object)

    expect(result).toEqual([2])
  })

  test('GET', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const result = await facade.get()
    expect(result).toHaveLength(1)
    result.forEach((obj) => {
      expect(obj).toHaveProperty('id', 1)
      expect(obj).toHaveProperty('idLocale', 1)
      expect(obj).toHaveProperty('idLocaleInvoicing', 1)
      expect(obj).toHaveProperty('idTeam', 1)
      expect(obj).toHaveProperty('idServiceRequested', 1)
      expect(obj).toHaveProperty('idServicePerformed', 1)
      expect(obj).toHaveProperty('idResource', 1)
      expect(obj).toHaveProperty('idMos', 1)
      expect(obj).toHaveProperty('idDistrict', 1)
      expect(obj).toHaveProperty('idConstructUnity', 1)
      expect(obj).toHaveProperty('performedDate')
      expect(obj).toHaveProperty('protocolo', 1)
      expect(obj).toHaveProperty('observation', 'Observation Example')
      expect(obj).toHaveProperty('valueC', 10.0)
      expect(obj).toHaveProperty('valueL', 10.0)
      expect(obj).toHaveProperty('valueP', 10.0)
      expect(obj).toHaveProperty('quantity', 10.0)
      expect(obj).toHaveProperty('value', 10.0)
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

    const result = await facade.getById(1)

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

    const params = [{ column: 'idLocale', signal: '=', value: 1 }]
    result = await facade.search(params)

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

    const params = [{ column: 'idLocale', signal: '=', value: 1, operator: 'AND' }]
    result = await facade.search(params)

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

    const params = [{ column: 'idLocale', signal: '=', value: 1, operator: 'OR' }]
    result = await facade.search(params)

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

    const params = [{ column: 'idLocale', signal: '=', value: 1, operator: 'LIKE' }]
    result = await facade.search(params)

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
    await facade.insert(object)

    const params = [
      {
        column: 'observation',
        signal: '=',
        value: ['Observation Example', 'Observation Example 2'],
        operator: 'IN',
      },
    ]

    result = await facade.search(params)

    expect(result).toHaveLength(2)
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
      protocolo: 1,
      observation: 'Observation Example',
      valueC: 20.0,
      valueL: 10.0,
      valueP: 10.0,
      quantity: 10.0,
      value: 10.0,
    }

    await facade.update(object, 1)

    const result = await facade.getById(1)

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
    expect(result).toHaveProperty('valueC', 20.0)
    expect(result).toHaveProperty('valueL', 10.0)
    expect(result).toHaveProperty('valueP', 10.0)
    expect(result).toHaveProperty('quantity', 10.0)
    expect(result).toHaveProperty('value', 10.0)
    expect(result).toHaveProperty('createdAt')
    expect(result).toHaveProperty('updatedAt')
    expect(result).toHaveProperty('deletedAt')
  })

  test('DELETE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    await facade.remove(1)

    const result2 = await facade.get()
    expect(result2).toHaveLength(0)
  })

  test('INSERT INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = { teste: 'User' }
    const result = await facade.insert(object)

    expect(result).toEqual({
      errors: [
        '"idLocale" is required',
        '"idLocaleInvoicing" is required',
        '"idTeam" is required',
        '"idServiceRequested" is required',
        '"idServicePerformed" is required',
        '"idResource" is required',
        '"idMos" is required',
        '"idDistrict" is required',
        '"idConstructUnity" is required',
        '"teste" is not allowed',
      ],
    })
  })

  test('GET VAZIO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    await facade.remove(1)

    const result = await facade.get()
    expect(result).toHaveLength(0)
  })

  test('GET BY ID INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const result = await facade.getById(2)
    expect(result).toBe(undefined)
  })

  test('SEARCH PADRÃO INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const params = [{ column: 'Aleatorio', signal: '=', value: 'Aleatorio' }]
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test('SEARCH AND INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const params = [{ column: 'Aleatorio', signal: '=', value: 'Aleatorio', operator: 'AND' }]
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test('SEARCH OR', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const params = [{ column: 'Aleatorio', signal: '=', value: 'Aleatorio', operator: 'OR' }]
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test('SEARCH LIKE', async () => {
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
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test('SEARCH IN', async () => {
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

    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test('UPDATE INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      TESTE: 'TESTE',
    }

    result = await facade.update(object, 1)
    expect(result).toEqual({
      errors: [
        '"idLocale" is required',
        '"idLocaleInvoicing" is required',
        '"idTeam" is required',
        '"idServiceRequested" is required',
        '"idServicePerformed" is required',
        '"idResource" is required',
        '"idMos" is required',
        '"idDistrict" is required',
        '"idConstructUnity" is required',
        '"TESTE" is not allowed',
      ],
    })
  })

  test('DELETE INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    result = await facade.remove(2)

    expect(result).toBe(0)
  })
})
