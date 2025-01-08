const { object } = require("joi")
const request = require("supertest")
const app = require("../../app")
require("dotenv").config({ path: ".env.test" })
const facade = require("../../facade/employee")

describe("Testes do banco de dados", () => {
  test("INSERT", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
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

    const result = await facade.insert(object)

    expect(result).toEqual([2])
  })

  test("GET", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const result = await facade.get()
    expect(result).toHaveLength(1)
    result.forEach((obj) => {
      expect(obj).toHaveProperty("id", 1)
      expect(obj).toHaveProperty("name", "Seed Name")
      expect(obj).toHaveProperty("dateOfBirth")
      expect(obj).toHaveProperty("gender", "Gender")
      expect(obj).toHaveProperty("maritalStatus", "Marital Status")
      expect(obj).toHaveProperty("cpf", "123456789")
      expect(obj).toHaveProperty("rg", "987654321")
      expect(obj).toHaveProperty("ctpsNumber", "CTPS")
      expect(obj).toHaveProperty("pisPasep", "PIS")
      expect(obj).toHaveProperty("birthCertificate", "Birth Certificate")
      expect(obj).toHaveProperty("nationality", "Nationality")
      expect(obj).toHaveProperty("birthplace", "Birthplace")
      expect(obj).toHaveProperty("hireDate")
      expect(obj).toHaveProperty("terminationDate")
      expect(obj).toHaveProperty("terminationReason", "Termination Reason")
      expect(obj).toHaveProperty("nickname", "Nickname")
      expect(obj).toHaveProperty("createdAt")
      expect(obj).toHaveProperty("updatedAt")
      expect(obj).toHaveProperty("deletedAt")
    })
  })

  test("GET BY ID", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const obj = await facade.getById(1)

    expect(obj).toHaveProperty("id", 1)
    expect(obj).toHaveProperty("name", "Seed Name")
    expect(obj).toHaveProperty("dateOfBirth")
    expect(obj).toHaveProperty("gender", "Gender")
    expect(obj).toHaveProperty("maritalStatus", "Marital Status")
    expect(obj).toHaveProperty("cpf", "123456789")
    expect(obj).toHaveProperty("rg", "987654321")
    expect(obj).toHaveProperty("ctpsNumber", "CTPS")
    expect(obj).toHaveProperty("pisPasep", "PIS")
    expect(obj).toHaveProperty("birthCertificate", "Birth Certificate")
    expect(obj).toHaveProperty("nationality", "Nationality")
    expect(obj).toHaveProperty("birthplace", "Birthplace")
    expect(obj).toHaveProperty("hireDate")
    expect(obj).toHaveProperty("terminationDate")
    expect(obj).toHaveProperty("terminationReason", "Termination Reason")
    expect(obj).toHaveProperty("nickname", "Nickname")
    expect(obj).toHaveProperty("createdAt")
    expect(obj).toHaveProperty("updatedAt")
    expect(obj).toHaveProperty("deletedAt")
  })

  test("SEARCH PADRÃO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Seed Name",
      gender: "Gender",
      maritalStatus: "Marital Status",
      cpf: "123456789",
      rg: "987654321",
      ctpsNumber: "CTPS",
      pisPasep: "PIS",
      birthCertificate: "Birth Certificate",
      nationality: "Nationality",
      birthplace: "Birthplace",
      terminationReason: "Termination Reason",
      nickname: "Nickname",
    }

    const params = [{ column: "id", signal: "=", value: 1 }]
    result = await facade.search(params)

    expect(result).toMatchObject([object])
  })

  test("SEARCH AND", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Seed Name",
      gender: "Gender",
      maritalStatus: "Marital Status",
      cpf: "123456789",
      rg: "987654321",
      ctpsNumber: "CTPS",
      pisPasep: "PIS",
      birthCertificate: "Birth Certificate",
      nationality: "Nationality",
      birthplace: "Birthplace",
      terminationReason: "Termination Reason",
      nickname: "Nickname",
    }

    const params = [{ column: "id", signal: "=", value: 1, operator: "AND" }]
    result = await facade.search(params)

    expect(result).toMatchObject([object])
  })

  test("SEARCH OR", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Seed Name",
      gender: "Gender",
      maritalStatus: "Marital Status",
      cpf: "123456789",
      rg: "987654321",
      ctpsNumber: "CTPS",
      pisPasep: "PIS",
      birthCertificate: "Birth Certificate",
      nationality: "Nationality",
      birthplace: "Birthplace",
      terminationReason: "Termination Reason",
      nickname: "Nickname",
    }

    const params = [{ column: "id", signal: "=", value: 1, operator: "OR" }]
    result = await facade.search(params)

    expect(result).toMatchObject([object])
  })

  test("SEARCH LIKE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      name: "Seed Name",
      gender: "Gender",
      maritalStatus: "Marital Status",
      cpf: "123456789",
      rg: "987654321",
      ctpsNumber: "CTPS",
      pisPasep: "PIS",
      birthCertificate: "Birth Certificate",
      nationality: "Nationality",
      birthplace: "Birthplace",
      terminationReason: "Termination Reason",
      nickname: "Nickname",
    }

    const params = [{ column: "id", signal: "=", value: 1, operator: "LIKE" }]
    result = await facade.search(params)

    expect(result).toMatchObject([object])
  })

  test("INSERT + SEARCH IN", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
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
    await facade.insert(object)

    const params = [
      {
        column: "id",
        signal: "=",
        value: [1, 2],
        operator: "IN",
      },
    ]

    result = await facade.search(params)

    expect(result).toHaveLength(2)
  })

  test("UPDATE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
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

    await facade.update(object, 1)

    const obj = await facade.getById(1)

    expect(obj).toHaveProperty("id", 1)
    expect(obj).toHaveProperty("name", "Teste Name")
    expect(obj).toHaveProperty("dateOfBirth")
    expect(obj).toHaveProperty("gender", "Gender")
    expect(obj).toHaveProperty("maritalStatus", "Marital Status")
    expect(obj).toHaveProperty("cpf", "CPF 2")
    expect(obj).toHaveProperty("rg", "RG 2")
    expect(obj).toHaveProperty("ctpsNumber", "CTPS 2")
    expect(obj).toHaveProperty("pisPasep", "PIS 2")
    expect(obj).toHaveProperty("birthCertificate", "Birth Certificate")
    expect(obj).toHaveProperty("nationality", "Nationality")
    expect(obj).toHaveProperty("birthplace", "Birthplace")
    expect(obj).toHaveProperty("hireDate")
    expect(obj).toHaveProperty("terminationDate")
    expect(obj).toHaveProperty("terminationReason", "Termination Reason")
    expect(obj).toHaveProperty("nickname", "Nickname")
    expect(obj).toHaveProperty("createdAt")
    expect(obj).toHaveProperty("updatedAt")
    expect(obj).toHaveProperty("deletedAt")
  })

  test("DELETE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    await facade.remove(1)

    const result2 = await facade.get()
    expect(result2).toHaveLength(0)
  })

  test("INSERT INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = { teste: "teste" }
    const result = await facade.insert(object)

    expect(result).toEqual({
      errors: ['"cpf" is required', '"teste" is not allowed'],
    })
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

  test("GET BY ID INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const result = await facade.getById(2)
    expect(result).toBe(undefined)
  })

  test("SEARCH PADRÃO INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const params = [{ column: "Aleatorio", signal: "=", value: "Aleatorio" }]
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test("SEARCH AND INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const params = [
      { column: "Aleatorio", signal: "=", value: "Aleatorio", operator: "AND" },
    ]
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test("SEARCH OR", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const params = [
      { column: "Aleatorio", signal: "=", value: "Aleatorio", operator: "OR" },
    ]
    result = await facade.search(params)

    expect(result).toBe(false)
  })

  test("SEARCH LIKE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

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

  test("SEARCH IN", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

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

  test("UPDATE INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    const object = {
      teste: "teste",
    }

    result = await facade.update(object, 1)
    expect(result).toEqual({
      errors: ['"cpf" is required', '"teste" is not allowed'],
    })
  })

  test("DELETE INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    })

    result = await facade.remove(2)

    expect(result).toBe(0)
  })
})
