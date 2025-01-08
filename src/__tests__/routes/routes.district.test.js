const request = require("supertest");
const app = require("../../app");
const agent = request.agent(app);

require("dotenv").config({ path: ".env.test" });
const routes = require("../../routes/district");

describe("Testes do banco de dados", () => {
  test("GET", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.get("/district");
    expect(response.status).toBe(200);
  });

  test("POST API.INSERT", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.post("/district").send({
      name: "Nome Teste",
      description: "cano de agua vazando",
    });
    expect(response.status).toBe(204);
  });

  test("POST API.INSERT INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.post("/district").send({
      name: "Nome Teste",
      description: 98,
    });
    expect(response.status).toBe(400);
  });

  test("POST API.SEARCH", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/district").send({
      name: "Nome Teste",
      description: "cano de agua vazando",
    });

    const params = [{ column: "name", signal: "=", value: "Nome Teste" }];

    const response = await agent.post("/district/search").send(params);

    expect(response.status).toBe(200);
  });

  test("POST API.SEARCH INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/district").send({
      name: "Nome Teste",
      description: "cano de agua vazando",
    });

    const params = [{ column: "name", signal: "=", value: "15" }];

    const response = await agent.post("/district/search").send(params);

    expect(response.status).toBe(404);
  });

  test("GET API.GETBYID", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    result = await agent.post("/district").send({
      name: "Nome Teste",
      description: "cano de agua vazando",
    });

    const id = 2;

    const response = await agent.get(`/district/${id}`);
    expect(response.status).toBe(200);
  });

  test("GET API.GETBYID INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/district").send({
      name: "Nome Teste",
      description: "cano de agua vazando",
    });

    const id = 3;

    const response = await agent.get(`/district/${id}`);

    expect(response.status).toBe(404);
  });

  test("PATCH API.UPDATE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/district").send({
      name: "Nome Teste",
      description: "cano de agua vazando",
    });

    const id = 2;
    const params = { name: "Mudou", description: "serviço ok" };

    const response = await agent.patch(`/district/${id}`).send(params);

    expect(response.status).toBe(204);
  });

  test("PATCH API.UPDATE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/district").send({
      name: "Nome Teste",
      description: "cano de agua vazando",
    });

    const id = 1;
    const params = { name: 3213 };

    const response = await agent.patch(`/district/${id}`).send(params);

    expect(response.status).toBe(400);
  });

  test("DELETE API.REMOVE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/district").send({
      name: "Nome Teste",
      description: "cano de agua vazando",
    });

    const id = 2;

    const response = await agent.delete(`/district/${id}`);

    expect(response.status).toBe(204);
  });

  test("DELETE API.REMOVE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/district").send({
      name: "Nome Teste",
      description: "cano de agua vazando",
    });

    const id = 3;

    const response = await agent.delete(`/district/${id}`);

    expect(response.status).toBe(400);
  });
});
