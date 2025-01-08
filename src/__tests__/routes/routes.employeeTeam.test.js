const request = require("supertest")
const app = require("../../app")
const agent = request.agent(app)

require("dotenv").config({ path: ".env.test" })
const routes = require("../../routes/employeeTeam")

describe("Testes do banco de dados", () => {
  test("GET", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const response = await agent.get("/employeeTeam")
    expect(response.status).toBe(200)
  })

  test("POST API.INSERT", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const response = await agent.post("/employeeTeam").send({
        idEmployee: 1, 
        idTeam: 1
    })
    expect(response.status).toBe(204)
  })

  test("POST API.INSERT INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const response = await agent.post("/employeeTeam").send({
        id_employee: "teste", 
        id_team: 1
    })
    expect(response.status).toBe(400)
  })

  test("POST API.SEARCH", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const params = [{ column: "id_employee", signal: "=", value: 1 }]

    const response = await agent.post("/employeeTeam/search").send(params)

    expect(response.status).toBe(200)
  })

  test("POST API.SEARCH INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const params = [{ column: "id_employee", signal: "=", value: "teste" }]

    const response = await agent.post("/employeeTeam/search").send(params)

    expect(response.status).toBe(404)
  })

  test("GET API.GETBYID", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 1

    const response = await agent.get(`/employeeTeam/${id}`)
    expect(response.status).toBe(200)
  })

  test("GET API.GETBYID INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 2

    const response = await agent.get(`/employeeTeam/${id}`)

    expect(response.status).toBe(404)
  })

  test("PATCH API.UPDATE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 1
    const params = {
        idEmployee: 1, 
        idTeam: 1
    }

    const response = await agent.patch(`/employeeTeam/${id}`).send(params)

    expect(response.status).toBe(204)
  })

  test("PATCH API.UPDATE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 2
    const params = { id_employee: 2 }

    const response = await agent.patch(`/employeeTeam/${id}`).send(params)

    expect(response.status).toBe(400)
  })

  test("DELETE API.REMOVE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 1

    const response = await agent.delete(`/employeeTeam/${id}`)

    expect(response.status).toBe(204)
  })

  test("DELETE API.REMOVE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 2

    const response = await agent.delete(`/employeeTeam/${id}`)

    expect(response.status).toBe(400)
  })
})
