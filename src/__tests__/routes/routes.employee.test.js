const request = require("supertest")
const app = require("../../app")
const agent = request.agent(app)

require("dotenv").config({ path: ".env.test" })
const routes = require("../../routes/employee")

describe("Testes do banco de dados", () => {
  test("GET", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const response = await agent.get("/employee")
    expect(response.status).toBe(200)
  })

  test("POST API.INSERT", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const response = await agent.post("/employee").send({
      name: "Teste Name",
      gender: "Gender",
      maritalStatus: "Marital Status",
      cpf: "CPF 2",
      rg: "RG 2",
      ctpsNumber: "CTPS 2",
      pisPasep: "PIS 2",
      birthCertificate: "Birth Certificate",
      nationality: "Nationality",
      birthplace: "Birthplace",
      terminationReason: "Termination Reason",
      nickname: "Nickname",
    })
    expect(response.status).toBe(204)
  })

  test("POST API.INSERT INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const response = await agent.post("/employee").send({
      name: "Teste Name",
    })
    expect(response.status).toBe(400)
  })

  test("POST API.SEARCH", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const params = [{ column: "id", signal: "=", value: 1 }]

    const response = await agent.post("/employee/search").send(params)

    expect(response.status).toBe(200)
  })

  test("POST API.SEARCH INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const params = [{ column: "id", signal: "=", value: "15" }]

    const response = await agent.post("/employee/search").send(params)

    expect(response.status).toBe(404)
  })

  test("GET API.GETBYID", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 1

    const response = await agent.get(`/employee/${id}`)
    expect(response.status).toBe(200)
  })

  test("GET API.GETBYID INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 2

    const response = await agent.get(`/employee/${id}`)

    expect(response.status).toBe(404)
  })

  test("PATCH API.UPDATE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 1
    const params = {
      name: "Teste Name",
      gender: "Gender",
      maritalStatus: "Marital Status",
      cpf: "CPF 2",
      rg: "RG 2",
      ctpsNumber: "CTPS 2",
      pisPasep: "PIS 2",
      birthCertificate: "Birth Certificate",
      nationality: "Nationality",
      birthplace: "Birthplace",
      terminationReason: "Termination Reason",
      nickname: "Nickname",
    }

    const response = await agent.patch(`/employee/${id}`).send(params)

    expect(response.status).toBe(204)
  })

  test("PATCH API.UPDATE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 2
    const params = { idLocale: 2 }

    const response = await agent.patch(`/employee/${id}`).send(params)

    expect(response.status).toBe(400)
  })

  test("DELETE API.REMOVE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 1

    const response = await agent.delete(`/employee/${id}`)

    expect(response.status).toBe(204)
  })

  test("DELETE API.REMOVE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 2

    const response = await agent.delete(`/employee/${id}`)

    expect(response.status).toBe(400)
  })
})
