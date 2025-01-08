const request = require('supertest')
const app = require('../../app')
const agent = request.agent(app)

require('dotenv').config({ path: '.env.test' })
const routes = require('../../routes/os')

describe('Testes do banco de dados', () => {
  test('GET', async () => {
    await agent.post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const response = await agent.get('/os')
    expect(response.status).toBe(200)
  })

  test('POST API.INSERT', async () => {
    await agent.post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const response = await agent.post('/os').send({
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
    })
    expect(response.status).toBe(204)
  })

  test('POST API.INSERT INCORRETO', async () => {
    await agent.post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const response = await agent.post('/os').send({
      idLocale: '',
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
    })
    expect(response.status).toBe(400)
  })

  test('POST API.SEARCH', async () => {
    await agent.post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const params = [{ column: 'idLocale', signal: '=', value: 1 }]

    const response = await agent.post('/os/search').send(params)

    expect(response.status).toBe(200)
  })

  test('POST API.SEARCH INCORRETO', async () => {
    await agent.post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const params = [{ column: 'idLocale', signal: '=', value: '15' }]

    const response = await agent.post('/os/search').send(params)

    expect(response.status).toBe(404)
  })

  test('GET API.GETBYID', async () => {
    await agent.post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const id = 1

    const response = await agent.get(`/os/${id}`)
    expect(response.status).toBe(200)
  })

  test('GET API.GETBYID INCORRETO', async () => {
    await agent.post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const id = 2

    const response = await agent.get(`/os/${id}`)

    expect(response.status).toBe(404)
  })

  test('PATCH API.UPDATE', async () => {
    await agent.post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const id = 1
    const params = {
      idLocale: 1,
      idLocaleInvoicing: 1,
      idTeam: 1,
      idServiceRequested: 1,
      idServicePerformed: 1,
      idResource: 1,
      idMos: 1,
      idDistrict: 1,
      idConstructUnity: 1,
      observation: 'Observation Example 2',
    }

    const response = await agent.patch(`/os/${id}`).send(params)

    expect(response.status).toBe(204)
  })

  test('PATCH API.UPDATE INCORRETO', async () => {
    await agent.post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const id = 2
    const params = { idLocale: 2 }

    const response = await agent.patch(`/os/${id}`).send(params)

    expect(response.status).toBe(400)
  })

  test('DELETE API.REMOVE', async () => {
    await agent.post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const id = 1

    const response = await agent.delete(`/os/${id}`)

    expect(response.status).toBe(204)
  })

  test('DELETE API.REMOVE INCORRETO', async () => {
    await agent.post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const id = 2

    const response = await agent.delete(`/os/${id}`)

    expect(response.status).toBe(400)
  })
})
