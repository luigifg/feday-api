const request = require("supertest")
const app = require("../../app")
const agent = request.agent(app);
require("dotenv").config({ path: ".env.test" })
const routes = require("../../routes/service")

describe("Testes do banco de dados", () => {
  test("Deve retornar o codigo 200.", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.get("/service")
    expect(response.status).toBe(200)
  })

  test("Deve inserir um novo usuário com informações válidas.", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.post("/service").send({
        externalCode: 123,
        name: "primeiro nome",
        description: "caixa de texto",
        serviceGroup: "grupo de serviço",
        criteria: "criteria",
        defaultTime: "1",
        teamType: 2,
        priority: 3,
        time: 4,
    })
    expect(response.status).toBe(204)
  })

  test("Deve retornar erro ao inserir usuário com informações inválidas.", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.post("/service").send({
        externalCode: 123,
        name: "primeiro nome",
        description: "caixa de texto",
        serviceGroup: "",
        criteria: "criteria",
        defaultTime: "1",
        teamType: 2,
        priority: 3,
        time: 4,
    })
    expect(response.status).toBe(400)
  })

  test("POST API.SEARCH", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/service").send({
        externalCode: 123,
        name: "primeiro nome",
        description: "caixa de texto",
        serviceGroup: "grupo de serviço",
        criteria: "criteria",
        defaultTime: "1",
        teamType: 2,
        priority: 3,
        time: 4,
    })

    const params = [{ column: "name", signal: "=", value: "primeiro nome" }]

    const response = await agent.post("/service/search").send(params)

    expect(response.status).toBe(200)
  })

  test("POST API.SEARCH INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/service").send({
        externalCode: 123,
        name: "primeiro nome",
        description: "caixa de texto",
        serviceGroup: "grupo de serviço",
        criteria: "criteria",
        defaultTime: "1",
        teamType: 2,
        priority: 3,
        time: 4,
    })

    const params = [{ column: "name", signal: "=", value: "15" }]

    const response = await agent.post("/service/search").send(params)

    expect(response.status).toBe(404)
  })

  test("GET API.GETBYID", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/service").send({
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    })

    const id = 2

    const response = await agent.get(`/service/${id}`)
    expect(response.status).toBe(200)
  })

  test("GET API.GETBYID INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/service").send({
      externalCode: 123,
        name: "primeiro nome",
        description: "caixa de texto",
        serviceGroup: "grupo de serviço",
        criteria: "criteria",
        defaultTime: "1",
        teamType: 2,
        priority: 3,
        time: 4,
    })

    const id = 3

    const response = await agent.get(`/service/${id}`)

    expect(response.status).toBe(404)
  })

  test("PATCH API.UPDATE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/service").send({
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    })

    const id = 1
    const params = { externalCode: 321, name: "Mudou", description: "caixa de texto 2", 
    serviceGroup: "grupo de serviço 2", criteria: "criteria 2", defaultTime: 12, teamType: 23, priority: 34, time: 45, }

    const response = await agent.patch(`/service/${id}`).send(params)

    expect(response.status).toBe(204)
  })

  test("PATCH API.UPDATE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await request(app).post("/service").send({
      externalCode: 123,
      name: "primeiro nome",
      description: "caixa de texto",
      serviceGroup: "grupo de serviço",
      criteria: "criteria",
      defaultTime: "1",
      teamType: 2,
      priority: 3,
      time: 4,
    })

    const id = 1
    const params = { name: "Mudou" }

    const response = await agent.patch(`/service/${id}`).send(params)

    expect(response.status).toBe(400)
  })

  test("DELETE API.REMOVE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/service").send({
      externalCode: 123,
        name: "primeiro nome",
        description: "caixa de texto",
        serviceGroup: "grupo de serviço",
        criteria: "criteria",
        defaultTime: "1",
        teamType: 2,
        priority: 3,
        time: 4,
    })

    const id = 1

    const response = await agent.delete(`/service/${id}`)

    expect(response.status).toBe(204)
  })

  test("DELETE API.REMOVE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });
    
    await agent.post("/service").send({
      externalCode: 123,
        name: "primeiro nome",
        description: "caixa de texto",
        serviceGroup: "grupo de serviço",
        criteria: "criteria",
        defaultTime: "1",
        teamType: 2,
        priority: 3,
        time: 4,
    })

    const id = 3

    const response = await agent.delete(`/service/${id}`)

    expect(response.status).toBe(400)
  })

})
