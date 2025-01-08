const request = require("supertest")
const app = require("../../app")
require("dotenv").config({ path: ".env.test" })
const facade = require("../../facade/group")

describe("Testes do banco de dados", () => {
  test("INSERT", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Nome Teste",
      
    }
    const result = await facade.insert(object)

    expect(result).toEqual([2])
  })

  test("INSERT + GET", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })
    const object1 = {
      name: "Nome Teste",
      
    }
    await facade.insert(object1)

    const object2 = {
      name: "Nome Teste",
      
    }
    await facade.insert(object2)

    const result = await facade.get()
    expect(result).toHaveLength(3)
    result.forEach((obj) => {
      expect(obj).toHaveProperty("id")
      expect(obj).toHaveProperty("name")
      expect(obj).toHaveProperty("createdAt")
      expect(obj).toHaveProperty("updatedAt")
      expect(obj).toHaveProperty("deletedAt")
    })
  })

  test("INSERT + GET BY ID", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Nome Teste",
      
    }
    await facade.insert(object)

    const result = await facade.getById(2)

    expect(result).toHaveProperty("id", 2)
    expect(result).toHaveProperty("name", "Nome Teste")
    expect(result).toHaveProperty("createdAt")
    expect(result).toHaveProperty("updatedAt")
    expect(result).toHaveProperty("deletedAt")
  })

  test("INSERT + SEARCH PADRÃO", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })
    const object = {
      name: "Nome Teste",
      
    }
    await facade.insert(object)

    const params = [{ column: "name", signal: "=", value: "Nome Teste" }]
    result = await facade.search(params)

    expect(result).toMatchObject([object])
  })

  test("INSERT + SEARCH AND", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Nome Teste",
      
    }
    await facade.insert(object)

    const params = [
      { column: "name", signal: "=", value: "Nome Teste", operator: "AND" },
    ]
    result = await facade.search(params)

    expect(result).toMatchObject([object])
  })

  test("INSERT + SEARCH OR", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Nome Teste",
      
    }
    await facade.insert(object)

    const params = [
      { column: "name", signal: "=", value: "Nome Teste", operator: "OR" },
    ]
    result = await facade.search(params)

    expect(result).toMatchObject([object])
  })

  test("INSERT + SEARCH LIKE", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Nome Teste",
      
    }
    await facade.insert(object)

    const params = [
      { column: "name", signal: "=", value: "Nome Teste", operator: "LIKE" },
    ]
    result = await facade.search(params)

    expect(result).toMatchObject([object])
  })

  test("INSERT + SEARCH IN", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })
    
    const object1 = {
      name: "Nome Teste",
      
    }
    await facade.insert(object1)

    const object2 = {
      name: "Nome Teste Segundo",
      
    }
    await facade.insert(object2)

    const params = [
      {
        column: "name",
        signal: "=",
        value: ["Nome Teste", "Nome Teste Segundo"],
        operator: "IN",
      },
    ]

    result = await facade.search(params)

    expect(result).toHaveLength(2)
  })

  test("INSERT + UPDATE", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object1 = {
      name: "Name1 Teste",
      
    }
    await facade.insert(object1)

    const resultGet = await facade.getById(2)

    expect(resultGet).toHaveProperty("id", 2)
    expect(resultGet).toHaveProperty("name", "Name1 Teste")

    const object2 = {
      name: "Name2 Teste",
    
    }

    await facade.update(object2, 2)

    const resultGet2 = await facade.getById(2)

    expect(resultGet2).toHaveProperty("id", 2)
    expect(resultGet2).toHaveProperty("name", "Name2 Teste")
    expect(resultGet2).toHaveProperty("createdAt")
    expect(resultGet2).toHaveProperty("updatedAt")
    expect(resultGet2).toHaveProperty("deletedAt")
  })

  test("INSERT + GET + DELETE", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object1 = {
      name: "Name1 Teste",
      
    }
    await facade.insert(object1)

    const result = await facade.get()
    expect(result).toHaveLength(2)

    await facade.remove(2)

    const result2 = await facade.get()
    expect(result2).toHaveLength(1)
  })

  test("INSERT INCORRETO", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = { teste: "Grupo" }
    const result = await facade.insert(object)

    expect(result).toEqual({"errors": ["\"name\" is required",  "\"teste\" is not allowed"]})
  })

  test("GET VAZIO", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    await facade.remove(1)

    const result = await facade.get()
    expect(result).toHaveLength(0)
  })

  test("INSERT + GET BY ID INCORRETO", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object1 = {
      name: "Name1 Teste",
    }

    await facade.insert(object1)

    const result = await facade.getById(3)
    expect(result).toBe(undefined)
  })

  test("INSERT + SEARCH PADRÃO INCORRETO", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Nome Teste",
    }

    await facade.insert(object)

    const params = [{ column: "Aleatorio", signal: "=", value: "Aleatorio" }]
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test("INSERT + SEARCH AND INCORRETO", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Nome Teste",
      
    }
    await facade.insert(object, )

    const params = [
      { column: "Aleatorio", signal: "=", value: "Aleatorio", operator: "AND" },
    ]
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test("INSERT + SEARCH OR", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Nome Teste",
      
    }
    await facade.insert(object)

    const params = [
      { column: "Aleatorio", signal: "=", value: "Aleatorio", operator: "OR" },
    ]
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test("INSERT + SEARCH LIKE", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Nome Teste",
    }

    await facade.insert(object)

    const params = [
      {
        column: "Aleatorio",
        signal: "=",
        value: "Aleatorio",
        operator: "LIKE",
      },
    ]
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test("INSERT + SEARCH IN", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object1 = {
      name: "Nome Teste",
    }

    await facade.insert(object1)

    const object2 = {
      name: "Nome Teste",
    }

    await facade.insert(object2)

    const params = [
      {
        column: "Aleatorio",
        signal: "=",
        value: ["Aleatorio", "Aleatorio"],
        operator: "IN",
      },
    ]

    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test("INSERT + UPDATE INCORRETO", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object1 = {
      name: "Name1 Teste",
    }

    await facade.insert(object1)

    const resultGet = await facade.getById(2)

    expect(resultGet).toHaveProperty("id", 2)
    expect(resultGet).toHaveProperty("name", "Name1 Teste")

    const object2 = {
      TESTE: "12345",
    }

    result = await facade.update(object2, 2)
    expect(result).toEqual({"errors": ["\"name\" is required", "\"TESTE\" is not allowed"]})
  })

  test("INSERT + DELETE INCORRETO", async () => {
      await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object1 = {
      name: "Name1 Teste",
    }

    await facade.insert(object1)

    result = await facade.remove(3)

    expect(result).toBe(0)
  })

})
