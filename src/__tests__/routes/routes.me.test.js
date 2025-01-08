const request = require("supertest")
const app = require("../../app")
const agent = request.agent(app)

require("dotenv").config({ path: ".env.test" })
const routes = require("../../routes/me")

describe("Testes do banco de dados", () => {
  test("GET API.GETBYID", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 1

    const response = await agent.get(`/user/${id}`)
    expect(response.status).toBe(200)
  })

  test("GET API.GETBYID INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const id = 2

    const response = await agent.get(`/user/${id}`)

    expect(response.status).toBe(404)
  })
})
