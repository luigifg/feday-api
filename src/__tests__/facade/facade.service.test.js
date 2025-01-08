const request = require("supertest")
const app = require("../../app")
require("dotenv").config({ path: ".env.test" })
const facade = require("../../facade/service")

describe("Testes do banco de dados", () => {
  test("INSERT", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
        externalCode: 123,
        name: "primeiro nome",
        description: "caixa de texto",
        serviceGroup: "grupo de serviço",
        criteria: "criteria",
        defaultTime: "1",
        teamType: 2,
        priority: 3,
        time: 4,
    }
    const result = await facade.insert(object)

    expect(result).toEqual([2])
  })//TESTAR

  test("INSERT 2 + GET", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object1 = {
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await facade.insert(object1)

    const object2 = {
      externalCode: 123456,
      name: "Segundo nome",
      description: "caixa de texto 2",
      serviceGroup: "grupo de serviço 2",
      criteria: "criteria 2",
      defaultTime: "12",
      teamType: 23,
      priority: 34,
      time: 45,
    }
    await facade.insert(object2)

    const result = await facade.get()
    expect(result).toHaveLength(3)
    result.forEach((obj) => {
        expect(obj).toHaveProperty("id")
        expect(obj).toHaveProperty("externalCode")
        expect(obj).toHaveProperty("name")
        expect(obj).toHaveProperty("description")
        expect(obj).toHaveProperty("serviceGroup")
        expect(obj).toHaveProperty("criteria")
        expect(obj).toHaveProperty("defaultTime")
        expect(obj).toHaveProperty("teamType")
        expect(obj).toHaveProperty("priority")
        expect(obj).toHaveProperty("time")
        expect(obj).toHaveProperty("createdAt")
        expect(obj).toHaveProperty("updatedAt")
        expect(obj).toHaveProperty("deletedAt")
    })
  })//TESTAR

  test("INSERT + GET BY ID", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
        externalCode: 123,
        name: "primeiro nome",
        description: "caixa de texto",
        serviceGroup: "grupo de serviço",
        criteria: "criteria",
        defaultTime: 1,
        teamType: 2,
        priority: 3,
        time: 4,
      }
      await facade.insert(object)
  
      const result = await facade.getById(2)
  
    expect(result).toHaveProperty("id", 2)
    expect(result).toHaveProperty("externalCode", 123)
    expect(result).toHaveProperty("name", "primeiro nome")
    expect(result).toHaveProperty("description", "caixa de texto")
    expect(result).toHaveProperty("serviceGroup", "grupo de serviço")
    expect(result).toHaveProperty("criteria", "criteria")
    expect(result).toHaveProperty("defaultTime", "1")
    expect(result).toHaveProperty("teamType", 2)
    expect(result).toHaveProperty("priority", 3)
    expect(result).toHaveProperty("time", 4)
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
        externalCode: 123,
        name: "primeiro nome",
        description: "caixa de texto",
        serviceGroup: "grupo de serviço",
        criteria: "criteria",
        defaultTime: "1",
        teamType: 2,
        priority: 3,
        time: 4,
      }
      await facade.insert(object)
  
      const params = [{ column: "name", signal: "=", value: "primeiro nome" }]
      result = await facade.search(params)
  
      expect(result).toMatchObject([object])
  })//testar


  test("INSERT + SEARCH AND", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await facade.insert(object)

    const params = [
      { column: "name", signal: "=", value: "primeiro nome", operator: "AND" },
    ]
    result = await facade.search(params)

    expect(result).toMatchObject([object])
  })//TESTAR

  test("INSERT + SEARCH OR", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await facade.insert(object)

    const params = [
      { column: "name", signal: "=", value: "primeiro nome", operator: "OR" },
    ]
    result = await facade.search(params)

    expect(result).toMatchObject([object])
  })//TESTAR

  test("INSERT + SEARCH LIKE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await facade.insert(object)

    const params = [
      { column: "name", signal: "=", value: "primeiro nome", operator: "LIKE" },
    ]
    result = await facade.search(params)

    expect(result).toMatchObject([object])
  })//TESTAR

  test("INSERT + SEARCH IN", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object1 = {
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await facade.insert(object1)

    const object2 = {
      externalCode: 123456,
      name: "Segundo nome",
      description: "caixa de texto 2",
      serviceGroup: "grupo de serviço 2",
      criteria: "criteria 2",
      defaultTime: "12",
      teamType: 23,
      priority: 34,
      time: 45,
    }
    await facade.insert(object2)

    const params = [
      {
        column: "name",
        signal: "=",
        value: ["primeiro nome", "segundo nome"],
        operator: "IN",
      },
    ]

    result = await facade.search(params)

    expect(result).toHaveLength(2)
  })//TESTAR

  test("INSERT + UPDATE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object1 = {
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await facade.insert(object1)

    const resultGet = await facade.getById(2)

    expect(resultGet).toHaveProperty("id", 2)
    expect(resultGet).toHaveProperty("externalCode", 123)
    expect(resultGet).toHaveProperty("name", "primeiro nome")
    expect(resultGet).toHaveProperty("description", "caixa de texto")
    expect(resultGet).toHaveProperty("serviceGroup", "grupo de serviço")
    expect(resultGet).toHaveProperty("criteria", "criteria")
    expect(resultGet).toHaveProperty("defaultTime", "1")
    expect(resultGet).toHaveProperty("teamType", 2)
    expect(resultGet).toHaveProperty("priority", 3)
    expect(resultGet).toHaveProperty("time", 4)
    expect(resultGet).toHaveProperty("createdAt")
    expect(resultGet).toHaveProperty("updatedAt")
    expect(resultGet).toHaveProperty("deletedAt")

    const object2 = {
      externalCode: 123456,
      name: "Segundo nome",
      description: "caixa de texto 2",
      serviceGroup: "grupo de serviço 2",
      criteria: "criteria 2",
      defaultTime: "12",
      teamType: 23,
      priority: 34,
      time: 45,
    }

    await facade.update(object2, 2)

    const resultGet2 = await facade.getById(2)

    expect(resultGet2).toHaveProperty("id", 2)
    expect(resultGet2).toHaveProperty("externalCode", 123456)
    expect(resultGet2).toHaveProperty("name", "Segundo nome")
    expect(resultGet2).toHaveProperty("description", "caixa de texto 2")
    expect(resultGet2).toHaveProperty("serviceGroup", "grupo de serviço 2")
    expect(resultGet2).toHaveProperty("criteria", "criteria 2")
    expect(resultGet2).toHaveProperty("defaultTime", "12")
    expect(resultGet2).toHaveProperty("teamType", 23)
    expect(resultGet2).toHaveProperty("priority", 34)
    expect(resultGet2).toHaveProperty("time", 45)
    expect(resultGet2).toHaveProperty("createdAt")
    expect(resultGet2).toHaveProperty("updatedAt")
    expect(resultGet2).toHaveProperty("deletedAt")
  })//testar

  test("INSERT + GET + DELETE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object1 = {
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await facade.insert(object1)

    const result = await facade.get()
    expect(result).toHaveLength(2)

    await facade.remove(2)

    const result2 = await facade.get()
    expect(result2).toHaveLength(1)
  })//testar

  test("INSERT INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = { teste: "service" }
    const result = await facade.insert(object)

    expect(result).toEqual({"errors": ["\"externalCode\" is required", "\"name\" is required", "\"description\" is required", "\"serviceGroup\" is required", "\"criteria\" is required", "\"defaultTime\" is required", "\"teamType\" is required", "\"priority\" is required", "\"time\" is required", "\"teste\" is not allowed"]})
  })//dar um console no result 

  test("GET VAZIO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const result = await facade.get()
    expect(result).toHaveLength(1)
  })//testar

  test("INSERT + GET BY ID INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object1 = {
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await facade.insert(object1)

    const result = await facade.getById(3)
    expect(result).toBe(undefined)
  })//testar

  test("INSERT + SEARCH PADRÃO INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await facade.insert(object, )

    const params = [{ column: "Aleatorio", signal: "=", value: "Aleatorio" }]
    result = await facade.search(params)

    expect(result).toBe(false)
  })//testar

  test("INSERT + SEARCH AND INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await facade.insert(object, )

    const params = [
      { column: "Aleatorio", signal: "=", value: "Aleatorio", operator: "AND" },
    ]
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test("INSERT + SEARCH OR INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await facade.insert(object, )

    const params = [
      { column: "Aleatorio", signal: "=", value: "Aleatorio", operator: "OR" },
    ]
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test("INSERT + SEARCH LIKE INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
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

  test("INSERT + SEARCH IN INCORRETO ", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object1 = {
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await facade.insert(object1)

    const object2 = {
      externalCode: 123456,
      name: "Segundo nome",
      description: "caixa de texto 2",
      serviceGroup: "grupo de serviço 2",
      criteria: "criteria 2",
      defaultTime: "12",
      teamType: 23,
      priority: 34,
      time: 45,
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
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await facade.insert(object1)

    const resultGet = await facade.getById(2)

    expect(resultGet).toHaveProperty("externalCode", 123)
    expect(resultGet).toHaveProperty("name", "primeiro nome")
    expect(resultGet).toHaveProperty("description", "caixa de texto")
    expect(resultGet).toHaveProperty("serviceGroup", "grupo de serviço")
    expect(resultGet).toHaveProperty("criteria", "criteria")
    expect(resultGet).toHaveProperty("defaultTime", "1")
    expect(resultGet).toHaveProperty("teamType", 2)
    expect(resultGet).toHaveProperty("priority", 3)
    expect(resultGet).toHaveProperty("time", 4)

    const object2 = {
        externalCode: 123,
        description: "caixa de texto",
        serviceGroup: "grupo de serviço",
        criteria: "criteria",
        defaultTime: "1",
        teamType: 2,
        priority: 3,
        time: 4,
        TESTE: "12345",
    }

    result = await facade.update(object2, 2)
    expect(result).toEqual({"errors": ["\"name\" is required", "\"TESTE\" is not allowed"]})
  })//ajustar

  test("INSERT + DELETE INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })
    
    const object1 = {
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    }
    await facade.insert(object1)

    result = await facade.remove(2)

    expect(result).toBe(1)
  })

})
