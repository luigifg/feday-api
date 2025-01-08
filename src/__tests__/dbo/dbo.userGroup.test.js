const request = require('supertest')
const app = require('../../app')
require('dotenv').config({ path: '.env.test' })
const dbo = require('../../dbo/base')
const { messages } = require('joi-translation-pt-br')
const tableName = 'user_group'
jest.setTimeout(20000)

describe('Testes do banco de dados', () => {
  test('INSERT', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      idUser: 1,
      idGroup: 1,
    }

    const result = await dbo.insert(object, tableName)
    expect(result).toEqual([2])
  })

  test('INSERT + GET ALL', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      idUser: 1,
      idGroup: 1,
    }

    await dbo.insert(object1, tableName)

    const result = await dbo.get(tableName)
    expect(result).toHaveLength(2)
    result.forEach((obj) => {
      expect(obj).toHaveProperty('id')
      expect(obj).toHaveProperty('idUser')
      expect(obj).toHaveProperty('idGroup')
    })
  })

  test('INSERT + GET BY ID', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      idUser: 1,
      idGroup: 1,
    }

    await dbo.insert(object1, tableName)

    const result = await dbo.getById(2, tableName)

    expect(result).toHaveProperty('id', 2)
    expect(result).toHaveProperty('idUser', 1)
    expect(result).toHaveProperty('idGroup', 1)
  })

  test('UPDATE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object2 = {
      idUser: 1,
      idGroup: 1,
    }

    await dbo.update(object2, 1, tableName)

    const resultGet2 = await dbo.getById(1, tableName)

    expect(resultGet2).toHaveProperty('id', 1)
    expect(resultGet2).toHaveProperty('idUser', 1)
    expect(resultGet2).toHaveProperty('idGroup', 1)
  })

  test('SEARCH PADRÃO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      idUser: 1,
      idGroup: 1,
    }

    const params = [{ column: 'id', signal: '=', value: '1' }]
    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('SEARCH AND', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      idUser: 1,
      idGroup: 1,
    }

    const params = [{ column: 'idUser', signal: '=', value: '1', operator: 'AND' }]
    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('SEARCH OR', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      idUser: 1,
      idGroup: 1,
    }

    const params = [{ column: 'idUser', signal: '=', value: '1', operator: 'OR' }]
    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('SEARCH LIKE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      idUser: 1,
      idGroup: 1,
    }

    const params = [{ column: 'idGroup', signal: '=', value: '1', operator: 'AND' }]

    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('SEARCH IN', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      idUser: 1,
      idGroup: 1,
    }

    await dbo.insert(object1, tableName)

    const params = [
      {
        column: 'idUser',
        signal: '=',
        value: [1, 1],
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
      idUser: 1,
      idGroup: 1,
    }

    await dbo.insert(object1, tableName)

    const result = await dbo.get(tableName)
    expect(result).toHaveLength(2)

    await dbo.remove(2, tableName)

    const result2 = await dbo.get(tableName)
    expect(result2).toHaveLength(1)
  })

  test('INSERT + GET + CLEAR', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      idUser: 1,
      idGroup: 1,
    }

    await dbo.insert(object1, tableName)

    const result = await dbo.get(tableName)
    expect(result).toHaveLength(2)

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

    const object2 = {
      idUser: 1,
      idGroup: 40,
    }

    result = await dbo.update(object2, 1, tableName)
    expect(result.errors)
  })

  test('SEARCH PADRÃO INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const params = [{ column: 'Aleatorio', signal: '=', value: 'Aleatorio' }]
    result = await dbo.search(tableName, params)

    expect(result).toBe(false)
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

  test('INSERT + DELETE INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    result = await dbo.remove(1, tableName)

    expect(result).toBe(1)
  })
})
