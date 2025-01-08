const request = require('supertest')
const app = require('../../app')
require('dotenv').config({ path: '.env.test' })
const dbo = require('../../dbo/base')
const { messages } = require('joi-translation-pt-br')
const tableName = 'district'

describe('Testes do banco de dados', () => {
  test('INSERT', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      name: 'Nome Teste',
      description: 'cano de agua vazando',
    }
    const result = await dbo.insert(object, tableName)
    expect(result).toEqual([2])
  })

  test('INSERT 2 + GET ALL', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      name: 'Nome Teste',
      description: 'cano de agua vazando',
    }
    await dbo.insert(object1, tableName)

    const object2 = {
      name: 'Nome Teste 2',
      description: 'cano de agua vazando 2',
    }
    await dbo.insert(object2, tableName)

    const result = await dbo.get(tableName)
    expect(result).toHaveLength(3)
    result.forEach((obj) => {
      expect(obj).toHaveProperty('id')
      expect(obj).toHaveProperty('name')
      expect(obj).toHaveProperty('description')
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
      name: 'Nome Teste',
      description: 'cano de agua vazando',
    }
    await dbo.insert(object1, tableName)

    const result = await dbo.getById(2, tableName)

    expect(result).toHaveProperty('id', 2)
    expect(result).toHaveProperty('name', 'Nome Teste')
    expect(result).toHaveProperty('description', 'cano de agua vazando')
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
      name: 'Nome Teste',
      description: 'cano de agua vazando',
    }
    await dbo.insert(object1, tableName)

    const resultGet = await dbo.getById(2, tableName)

    expect(resultGet).toHaveProperty('id', 2)
    expect(resultGet).toHaveProperty('name', 'Nome Teste')
    expect(resultGet).toHaveProperty('description', 'cano de agua vazando')

    const object2 = {
      name: 'Nome2 Teste',
      description: 'cano de agua vazando 2',
    }

    await dbo.update(object2, 2, tableName)

    const resultGet2 = await dbo.getById(2, tableName)

    expect(resultGet2).toHaveProperty('id', 2)
    expect(resultGet2).toHaveProperty('name', 'Nome2 Teste')
    expect(resultGet2).toHaveProperty('description', 'cano de agua vazando 2')
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
      name: 'Nome Teste2',
      description: 'cano de agua vazando2',
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'name', signal: '=', value: 'Nome Teste2' }]
    result = await dbo.search(tableName, params)
    expect(result).toMatchObject([object])
  })

  test('INSERT + SEARCH AND', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      name: 'Nome Teste 2',
      description: 'cano de agua vazando 2',
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'name', signal: '=', value: 'Nome Teste 2', operator: 'AND' }]
    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('INSERT + SEARCH OR', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      name: 'Nome Teste 2',
      description: 'cano de agua vazando 2',
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'name', signal: '=', value: 'Nome Teste 2', operator: 'OR' }]
    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('INSERT + SEARCH LIKE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      name: 'primeiro nome',
      description: 'cano de agua vazando',
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
      name: 'Nome Teste',
      description: 'cano de agua vazando',
    }
    await dbo.insert(object1, tableName)

    const object2 = {
      name: 'Nome Teste',
      description: 'cano de agua vazando 2',
    }
    await dbo.insert(object2, tableName)

    const params = [
      {
        column: 'description',
        signal: '=',
        value: ['cano de agua vazando', 'cano de agua vazando 2'],
        operator: 'IN',
      },
    ]

    result = await dbo.search(tableName, params)

    expect(result).toHaveLength(3)
  })

  test('INSERT + GET + DELETE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      name: 'Nome Teste',
      description: 'cano de agua vazando',
    }
    await dbo.insert(object1, tableName)

    const result = await dbo.get(tableName)
    expect(result).toHaveLength(2)

    await dbo.remove(1, tableName)

    const result2 = await dbo.get(tableName)
    expect(result2).toHaveLength(1)
  })

  test('INSERT + GET + CLEAR', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      name: 'Nome Teste',
      description: 'cano de agua vazando',
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

    const object = { teste: 'User' }
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
      name: 'Nome Teste',
      description: 'cano de agua vazando',
    }
    await dbo.insert(object1, tableName)

    const result = await dbo.getById(3, tableName)
    expect(result).toBe(undefined)
  })

  test('INSERT + UPDATE INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      name: 'Nome Teste',
      description: 'cano de agua vazando',
    }
    await dbo.insert(object1, tableName)

    const resultGet = await dbo.getById(2, tableName)

    expect(resultGet).toHaveProperty('id', 2)
    expect(resultGet).toHaveProperty('name', 'Nome Teste')
    expect(resultGet).toHaveProperty('description', 'cano de agua vazando')

    const object2 = {
      name: 'Nome Teste 2',
      description: 'cano de agua vazando 2',
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
      name: 'Nome Teste',
      description: 'cano de agua vazando',
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
      name: 'Nome Teste',
      description: 'cano de agua vazando',
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
      name: 'Nome Teste',
      description: 'cano de agua vazando',
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'Aleatorio', signal: '=', value: 'Aleatorio', operator: 'OR' }]
    result = await dbo.search(tableName, params)

    expect(result).toBe(false)
  })

  test('INSERT + SEARCH LIKE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      name: 'Nome Teste',
      description: 'cano de agua vazando',
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
      name: 'Nome Teste',
      description: 'cano de agua vazando',
    }
    await dbo.insert(object1, tableName)

    const object2 = {
      name: 'Nome Teste',
      description: 'cano de agua vazando2',
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
      name: 'Nome Teste',
      description: 'cano de agua vazando',
    }
    await dbo.insert(object1, tableName)

    result = await dbo.remove(3, tableName)

    expect(result).toBe(0)
  })
})
