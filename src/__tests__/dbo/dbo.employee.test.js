const request = require('supertest')
const app = require('../../app')
require('dotenv').config({ path: '.env.test' })
const dbo = require('../../dbo/base')
const { messages } = require('joi-translation-pt-br')
const tableName = 'employee'

describe('Testes do banco de dados', () => {
  test('INSERT', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      name: 'Teste Name',
      gender: 'Gender',
      maritalStatus: 'Marital Status',
      cpf: 'CPF 2',
      rg: 'RG 2',
      ctpsNumber: 'CTPS 2',
      pisPasep: 'PIS 2',
      birthCertificate: 'Birth Certificate',
      nationality: 'Nationality',
      birthplace: 'Birthplace',
      terminationReason: 'Termination Reason',
      nickname: 'Nickname',
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
      name: 'Teste Name',
      gender: 'Gender',
      maritalStatus: 'Marital Status',
      cpf: 'CPF 2',
      rg: 'RG 2',
      ctpsNumber: 'CTPS 2',
      pisPasep: 'PIS 2',
      birthCertificate: 'Birth Certificate',
      nationality: 'Nationality',
      birthplace: 'Birthplace',
      terminationReason: 'Termination Reason',
      nickname: 'Nickname',
    }

    await dbo.insert(object, tableName)

    const result = await dbo.get(tableName)
    expect(result).toHaveLength(2)
    result.forEach((obj) => {
      expect(obj).toHaveProperty('id')
      expect(obj).toHaveProperty('name')
      expect(obj).toHaveProperty('dateOfBirth')
      expect(obj).toHaveProperty('gender')
      expect(obj).toHaveProperty('maritalStatus')
      expect(obj).toHaveProperty('cpf')
      expect(obj).toHaveProperty('rg')
      expect(obj).toHaveProperty('ctpsNumber')
      expect(obj).toHaveProperty('pisPasep')
      expect(obj).toHaveProperty('birthCertificate')
      expect(obj).toHaveProperty('nationality')
      expect(obj).toHaveProperty('birthplace')
      expect(obj).toHaveProperty('hireDate')
      expect(obj).toHaveProperty('terminationDate')
      expect(obj).toHaveProperty('terminationReason')
      expect(obj).toHaveProperty('nickname')
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
    expect(obj).toHaveProperty('name', 'Seed Name')
    expect(obj).toHaveProperty('dateOfBirth')
    expect(obj).toHaveProperty('gender', 'Gender')
    expect(obj).toHaveProperty('maritalStatus', 'Marital Status')
    expect(obj).toHaveProperty('cpf', '123456789')
    expect(obj).toHaveProperty('rg', '987654321')
    expect(obj).toHaveProperty('ctpsNumber', 'CTPS')
    expect(obj).toHaveProperty('pisPasep', 'PIS')
    expect(obj).toHaveProperty('birthCertificate', 'Birth Certificate')
    expect(obj).toHaveProperty('nationality', 'Nationality')
    expect(obj).toHaveProperty('birthplace', 'Birthplace')
    expect(obj).toHaveProperty('hireDate')
    expect(obj).toHaveProperty('terminationDate')
    expect(obj).toHaveProperty('terminationReason', 'Termination Reason')
    expect(obj).toHaveProperty('nickname', 'Nickname')
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
      name: 'Teste Name',
    }

    await dbo.update(object, 1, tableName)

    const obj = await dbo.getById(1, tableName)

    expect(obj).toHaveProperty('id', 1)
    expect(obj).toHaveProperty('name', 'Teste Name')
    expect(obj).toHaveProperty('dateOfBirth')
    expect(obj).toHaveProperty('gender', 'Gender')
    expect(obj).toHaveProperty('maritalStatus', 'Marital Status')
    expect(obj).toHaveProperty('cpf', '123456789')
    expect(obj).toHaveProperty('rg', '987654321')
    expect(obj).toHaveProperty('ctpsNumber', 'CTPS')
    expect(obj).toHaveProperty('pisPasep', 'PIS')
    expect(obj).toHaveProperty('birthCertificate', 'Birth Certificate')
    expect(obj).toHaveProperty('nationality', 'Nationality')
    expect(obj).toHaveProperty('birthplace', 'Birthplace')
    expect(obj).toHaveProperty('hireDate')
    expect(obj).toHaveProperty('terminationDate')
    expect(obj).toHaveProperty('terminationReason', 'Termination Reason')
    expect(obj).toHaveProperty('nickname', 'Nickname')
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
      name: 'Seed Name',
      gender: 'Gender',
      maritalStatus: 'Marital Status',
      cpf: '123456789',
      rg: '987654321',
      ctpsNumber: 'CTPS',
      pisPasep: 'PIS',
      birthCertificate: 'Birth Certificate',
      nationality: 'Nationality',
      birthplace: 'Birthplace',
      terminationReason: 'Termination Reason',
      nickname: 'Nickname',
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
      name: 'Seed Name',
      gender: 'Gender',
      maritalStatus: 'Marital Status',
      cpf: '123456789',
      rg: '987654321',
      ctpsNumber: 'CTPS',
      pisPasep: 'PIS',
      birthCertificate: 'Birth Certificate',
      nationality: 'Nationality',
      birthplace: 'Birthplace',
      terminationReason: 'Termination Reason',
      nickname: 'Nickname',
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
      name: 'Seed Name',
      gender: 'Gender',
      maritalStatus: 'Marital Status',
      cpf: '123456789',
      rg: '987654321',
      ctpsNumber: 'CTPS',
      pisPasep: 'PIS',
      birthCertificate: 'Birth Certificate',
      nationality: 'Nationality',
      birthplace: 'Birthplace',
      terminationReason: 'Termination Reason',
      nickname: 'Nickname',
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
      name: 'Seed Name',
      gender: 'Gender',
      maritalStatus: 'Marital Status',
      cpf: '123456789',
      rg: '987654321',
      ctpsNumber: 'CTPS',
      pisPasep: 'PIS',
      birthCertificate: 'Birth Certificate',
      nationality: 'Nationality',
      birthplace: 'Birthplace',
      terminationReason: 'Termination Reason',
      nickname: 'Nickname',
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
      name: 'Teste Name',
      gender: 'Gender',
      maritalStatus: 'Marital Status',
      cpf: 'CPF 2',
      rg: 'RG 2',
      ctpsNumber: 'CTPS 2',
      pisPasep: 'PIS 2',
      birthCertificate: 'Birth Certificate',
      nationality: 'Nationality',
      birthplace: 'Birthplace',
      terminationReason: 'Termination Reason',
      nickname: 'Nickname',
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
