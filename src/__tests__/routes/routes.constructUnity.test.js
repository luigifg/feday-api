const request = require("supertest")
const app = require("../../app")
const agent = request.agent(app)

require("dotenv").config({ path: ".env.test" })
const routes = require("../../routes/constructUnity")

describe("Testes do banco de dados", () => {
  test("GET", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const response = await agent.get("/constructUnity")
    expect(response.status).toBe(200)
  })

  test("POST API.INSERT", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const response = await agent.post("/constructUnity").send({
      name: "Teste Nome",
      description: "Teste Descrição",
    })
    expect(response.status).toBe(204)
  })

  test("POST API.INSERT INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const response = await agent.post("/constructUnity").send({
      name: "",
      description: "",
    })
    expect(response.status).toBe(400)
  })

  test("POST API.SEARCH", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const params = [{ column: "id", signal: "=", value: 1 }]

    const response = await agent.post("/constructUnity/search").send(params)

    expect(response.status).toBe(200)
  })

  test("POST API.SEARCH INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const params = [{ column: "id", signal: "=", value: "15" }]

    const response = await agent.post("/constructUnity/search").send(params)

    expect(response.status).toBe(404)
  })

  test("GET API.GETBYID", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 1

    const response = await agent.get(`/constructUnity/${id}`)
    expect(response.status).toBe(200)
  })

  test("GET API.GETBYID INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 2

    const response = await agent.get(`/constructUnity/${id}`)

    expect(response.status).toBe(404)
  })

  test("PATCH API.UPDATE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 1
    const params = {
      name: "Teste Nome",
      description: "Teste Descrição",
    }

    const response = await agent.patch(`/constructUnity/${id}`).send(params)

    expect(response.status).toBe(204)
  })

  test("PATCH API.UPDATE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 2
    const params = { idLocale: 2 }

    const response = await agent.patch(`/constructUnity/${id}`).send(params)

    expect(response.status).toBe(400)
  })

  test("DELETE API.REMOVE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 1

    const response = await agent.delete(`/constructUnity/${id}`)

    expect(response.status).toBe(204)
  })

  test("DELETE API.REMOVE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 2

    const response = await agent.delete(`/constructUnity/${id}`)

    expect(response.status).toBe(400)
  })
})
