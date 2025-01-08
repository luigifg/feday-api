const request = require('supertest')
const app = require('../../app')
require('dotenv').config({ path: '.env.test' })
const dbo = require('../../dbo/base')
const { messages } = require('joi-translation-pt-br')
const tableName = 'user'

describe('Testes do banco de dados', () => {
  test('INSERT + GET BY ID', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const result = await dbo.getById(1, tableName)

    expect(result).toHaveProperty('id', 1)
    expect(result).toHaveProperty('name', 'Teste')
    expect(result).toHaveProperty('email', 'teste@email.com')
    expect(result).toHaveProperty('password')
    expect(result).toHaveProperty('status')
    expect(result).toHaveProperty('createdAt')
    expect(result).toHaveProperty('updatedAt')
    expect(result).toHaveProperty('deletedAt')
  })

  test('INSERT + GET BY ID INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const result = await dbo.getById(2, tableName)
    expect(result).toBe(undefined)
  })
})
