const request = require("supertest")
const app = require("../../app")
const agent = request.agent(app)

require("dotenv").config({ path: ".env.test" })
const routes = require("../../routes/screen")

describe("Testes do banco de dados", () => {
  test("GET", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const response = await agent.get("/screen")
    expect(response.status).toBe(200)
  })

  test("POST API.INSERT", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const response = await agent.post("/screen").send({
      name: "Nome Teste",
      route: 2,
      order: 2,
    })
    expect(response.status).toBe(204)
  })

  test("POST API.INSERT INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const response = await agent.post("/screen").send({
      name: "Nome Teste",
      route: 2,
      order: "",
    })
    expect(response.status).toBe(400)
  })

  test("POST API.SEARCH", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const params = [{ column: "name", signal: "=", value: "Teste Seed" }]

    const response = await agent.post("/screen/search").send(params)

    expect(response.status).toBe(200)
  })

  test("POST API.SEARCH INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const params = [{ column: "name", signal: "=", value: "15" }]

    const response = await agent.post("/screen/search").send(params)

    expect(response.status).toBe(404)
  })

  test("GET API.GETBYID", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 1

    const response = await agent.get(`/screen/${id}`)
    expect(response.status).toBe(200)
  })

  test("GET API.GETBYID INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 2

    const response = await agent.get(`/screen/${id}`)

    expect(response.status).toBe(404)
  })

  test("PATCH API.UPDATE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 1
    const params = { name: "Mudou", route: 2, order: 2 }

    const response = await agent.patch(`/screen/${id}`).send(params)

    expect(response.status).toBe(204)
  })

  test("PATCH API.UPDATE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 1
    const params = { name: "Mudou" }

    const response = await agent.patch(`/screen/${id}`).send(params)

    expect(response.status).toBe(400)
  })

  test("DELETE API.REMOVE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 1

    const response = await agent.delete(`/screen/${id}`)

    expect(response.status).toBe(204)
  })

  test("DELETE API.REMOVE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 2

    const response = await agent.delete(`/screen/${id}`)

    expect(response.status).toBe(400)
  })
})
