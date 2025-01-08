const request = require("supertest")
const app = require("../app")
require("dotenv").config({ path: ".env.test" })

describe("Testes de login", () => {
  test("Teste de autenticação", async () => {
    response = await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    expect(response.status).toBe(200)
  })

  test("Teste de login com senha incorreta", async () => {
    response = await request(app).post("/login").send({
      email: "teste@email.com",
      password: "1234",
    })

    expect(response.status).toBe(404)
  })

  test("Teste de login com email incorreto", async () => {
    response = await request(app).post("/login").send({
      email: "teste@teste.com",
      password: "1234",
    })

    expect(response.status).toBe(404)
  })

  test("Teste de logout", async () => {
    response = await request(app).post("/logout")

    expect(response.status).toBe(200)
  })
})
