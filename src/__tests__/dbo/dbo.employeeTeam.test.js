const request = require('supertest')
const app = require('../../app')
require('dotenv').config({ path: '.env.test' })
const dbo = require('../../dbo/base')
const { messages } = require('joi-translation-pt-br')
const tableName = 'employee_team'

describe('Testes do banco de dados', () => {
  test('INSERT', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      idEmployee: 1,
      idTeam: 1,
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
      idEmployee: 1,
      idTeam: 1,
    }

    await dbo.insert(object, tableName)

    const result = await dbo.get(tableName)
    expect(result).toHaveLength(2)
    result.forEach((obj) => {
      expect(obj).toHaveProperty('id')
      expect(obj).toHaveProperty('idEmployee')
      expect(obj).toHaveProperty('idTeam')
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

    const obj = await dbo.getById(1, tableName)

    expect(obj).toHaveProperty('id', 1)
    expect(obj).toHaveProperty('idEmployee', 1)
    expect(obj).toHaveProperty('idTeam', 1)
    expect(obj).toHaveProperty('createdAt')
    expect(obj).toHaveProperty('updatedAt')
    expect(obj).toHaveProperty('deletedAt')
  })

  test('UPDATE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      idEmployee: 1,
      idTeam: 1,
    }

    await dbo.update(object, 1, tableName)

    const obj = await dbo.getById(1, tableName)

    expect(obj).toHaveProperty('id', 1)
    expect(obj).toHaveProperty('idEmployee', 1)
    expect(obj).toHaveProperty('idTeam', 1)
    expect(obj).toHaveProperty('createdAt')
    expect(obj).toHaveProperty('updatedAt')
    expect(obj).toHaveProperty('deletedAt')
  })

  test('SEARCH PADRÃO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      idEmployee: 1,
      idTeam: 1,
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
      idEmployee: 1,
      idTeam: 1,
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
      idEmployee: 1,
      idTeam: 1,
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
      idEmployee: 1,
      idTeam: 1,
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
      idEmployee: 1,
      idTeam: 1,
    }
    await dbo.insert(object, tableName)

    const params = [
      {
        column: 'id',
        signal: '=',
        value: [1, 2],
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
