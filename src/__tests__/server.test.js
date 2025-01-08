const request = require('supertest')
const app = require('../app')

describe('Test the root path', () => {
  test('Deve responder ao método GET', () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(204)
      })
  })

  test('Deve responder a rota PING', () => {
    return request(app)
      .get('/ping')
      .then((response) => {
        expect(response.text).toBe('Pong')
      })
  })
})
