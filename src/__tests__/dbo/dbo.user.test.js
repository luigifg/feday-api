const request = require('supertest')
const app = require('../../app')
require('dotenv').config({ path: '.env.test' })
const dbo = require('../../dbo/base')
const { messages } = require('joi-translation-pt-br')
const tableName = 'user'

describe('Testes do banco de dados', () => {
  // test("INSERT", async () => {
  //   await request(app).post("/login").send({
  //     email: "teste@email.com",
  //     password: "123",
  //   })

  //   const object = {
  //     name: "Nome Teste",
  //     email: "email@teste.com",
  //     password: "12345",
  //   }
  //   const result = await dbo.insert(object, tableName)
  //   expect(result).toEqual([2])
  // })

  test('INSERT NOVO', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'teste@email.com',
        password: '123',
      })
      .then(() => {
        const object = {
          name: 'Nome Teste',
          email: 'email@teste.com',
          password: '12345',
        }
        return dbo.insert(object, tableName)
      })
      .then((result) => {
        expect(result).toEqual([2])
        done()
      })
      .catch((error) => {
        done(error)
      })
  })

  // test("INSERT 2 + GET ALL", async () => {
  //   await request(app).post("/login").send({
  //     email: "teste@email.com",
  //     password: "123",
  //   })

  //   const object1 = {
  //     name: "Name1 Teste",
  //     email: "Name1@teste.com",
  //     password: "12345",
  //   }
  //   await dbo.insert(object1, tableName)

  //   const object2 = {
  //     name: "Name2 Teste",
  //     email: "Name2@teste.com",
  //     password: "12345",
  //   }
  //   await dbo.insert(object2, tableName)

  //   const result = await dbo.get(tableName)
  //   expect(result).toHaveLength(3)
  //   result.forEach((obj) => {
  //     expect(obj).toHaveProperty("id")
  //     expect(obj).toHaveProperty("name")
  //     expect(obj).toHaveProperty("email")
  //     expect(obj).toHaveProperty("password")
  //     expect(obj).toHaveProperty("status")
  //     expect(obj).toHaveProperty("createdAt")
  //     expect(obj).toHaveProperty("updatedAt")
  //     expect(obj).toHaveProperty("deletedAt")
  //   })
  // })

  test('INSERT 2 + GET ALL NOVO', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'teste@email.com',
        password: '123',
      })
      .then(() => {
        const object1 = {
          name: 'Name1 Teste',
          email: 'Name1@teste.com',
          password: '12345',
        }
        return dbo.insert(object1, tableName)
      })
      .then(() => {
        const object2 = {
          name: 'Name2 Teste',
          email: 'Name2@teste.com',
          password: '12345',
        }
        return dbo.insert(object2, tableName)
      })
      .then(() => {
        return dbo.get(tableName)
      })
      .then((result) => {
        expect(result).toHaveLength(3)
        result.forEach((obj) => {
          expect(obj).toHaveProperty('id')
          expect(obj).toHaveProperty('name')
          expect(obj).toHaveProperty('email')
          expect(obj).toHaveProperty('password')
          expect(obj).toHaveProperty('status')
          expect(obj).toHaveProperty('createdAt')
          expect(obj).toHaveProperty('updatedAt')
          expect(obj).toHaveProperty('deletedAt')
        })
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test('INSERT + GET BY ID', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      name: 'Name1 Teste',
      email: 'Name1@teste.com',
      password: '12345',
    }
    await dbo.insert(object1, tableName)

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

  test('INSERT + UPDATE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      name: 'Name1 Teste',
      email: 'Name1@teste.com',
      password: '12345',
    }
    await dbo.insert(object1, tableName)

    const resultGet = await dbo.getById(1, tableName)

    expect(resultGet).toHaveProperty('id', 1)
    expect(resultGet).toHaveProperty('name', 'Teste')
    expect(resultGet).toHaveProperty('email', 'teste@email.com')
    expect(resultGet).toHaveProperty('password')

    const object2 = {
      name: 'Name2 Teste',
      email: 'Name2@teste.com',
      password: '12345',
    }

    await dbo.update(object2, 1, tableName)

    const resultGet2 = await dbo.getById(1, tableName)

    expect(resultGet2).toHaveProperty('id', 1)
    expect(resultGet2).toHaveProperty('name', 'Name2 Teste')
    expect(resultGet2).toHaveProperty('email', 'Name2@teste.com')
    expect(resultGet2).toHaveProperty('password')
    expect(resultGet2).toHaveProperty('status')
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
      name: 'Nome Teste',
      email: 'email@teste.com',
      password: '12345',
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'name', signal: '=', value: 'Nome Teste' }]
    result = await dbo.search(tableName, params)
    expect(result).toMatchObject([object])
  })

  test('INSERT + SEARCH AND', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      name: 'Nome Teste',
      email: 'email@teste.com',
      password: '12345',
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'name', signal: '=', value: 'Nome Teste', operator: 'AND' }]
    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('INSERT + SEARCH OR', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      name: 'Nome Teste',
      email: 'email@teste.com',
      password: '12345',
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'name', signal: '=', value: 'Nome Teste', operator: 'OR' }]
    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('INSERT + SEARCH LIKE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      name: 'Nome Teste',
      email: 'email@teste.com',
      password: '12345',
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'name', signal: '=', value: 'Nome T', operator: 'LIKE' }]
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
      email: 'email1@teste.com',
      password: '12345',
    }
    await dbo.insert(object1, tableName)

    const object2 = {
      name: 'Nome Teste',
      email: 'email2@teste.com',
      password: '12345',
    }
    await dbo.insert(object2, tableName)

    const params = [
      {
        column: 'email',
        signal: '=',
        value: ['email1@teste.com', 'email2@teste.com'],
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
      name: 'Name1 Teste',
      email: 'Name1@teste.com',
      password: '12345',
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
      name: 'Name1 Teste',
      email: 'Name1@teste.com',
      password: '12345',
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
      name: 'Name1 Teste',
      email: 'Name1@teste.com',
      password: '12345',
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
      name: 'Name1 Teste',
      email: 'Name1@teste.com',
      password: '12345',
    }
    await dbo.insert(object1, tableName)

    const resultGet = await dbo.getById(1, tableName)

    expect(resultGet).toHaveProperty('id', 1)
    expect(resultGet).toHaveProperty('name', 'Teste')
    expect(resultGet).toHaveProperty('email', 'teste@email.com')
    expect(resultGet).toHaveProperty('password')

    const object2 = {
      name: 'Name2 Teste',
      email: 'Name2@teste.com',
      TESTE: '12345',
    }

    result = await dbo.update(object2, 1, tableName)
    expect(result.errors)
  })

  test('INSERT + SEARCH PADRÃO INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      name: 'Nome Teste',
      email: 'email@teste.com',
      password: '12345',
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
      email: 'email@teste.com',
      password: '12345',
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
      email: 'email@teste.com',
      password: '12345',
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
      email: 'email@teste.com',
      password: '12345',
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
      email: 'email1@teste.com',
      password: '12345',
    }
    await dbo.insert(object1, tableName)

    const object2 = {
      name: 'Nome Teste',
      email: 'email2@teste.com',
      password: '12345',
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
      name: 'Name1 Teste',
      email: 'Name1@teste.com',
      password: '12345',
    }
    await dbo.insert(object1, tableName)

    result = await dbo.remove(3, tableName)

    expect(result).toBe(0)
  })
})
