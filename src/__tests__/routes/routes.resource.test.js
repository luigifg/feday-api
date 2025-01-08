const request = require("supertest");
const app = require("../../app");
const agent = request.agent(app);
require("dotenv").config({ path: ".env.test" });
const routes = require("../../routes/resource");

describe("Testes do banco de dados", () => {
  test("GET", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.get("/resource");
    expect(response.status).toBe(200);
  });

  test("POST API.INSERT", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.post("/resource").send({
      name: "Teste Nome 1",
      description: "corte de agua 1",
    });
    expect(response.status).toBe(204);
  });

  test("POST API.INSERT INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.post("/resource").send({
      name: "Matheus",
      description: "",
    });
    expect(response.status).toBe(400);
  });

  test("POST API.SEARCH", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/resource").send({
      name: "Teste 1",
      description: "corte de agua 1",
    });

    const params = [{ column: "name", signal: "=", value: "Teste 1" }];

    const response = await agent.post("/resource/search").send(params);

    expect(response.status).toBe(200);
  });

  test("POST API.SEARCH INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/resource").send({
      name: "Teste Nome 1",
      description: "",
    });

    const params = [{ column: "name", signal: "=", value: "15" }];

    const response = await agent.post("/resource/search").send(params);

    expect(response.status).toBe(404);
  });

  test("GET API.GETBYID", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    result = await agent.post("/resource").send({
      name: "Teste Nome 1",
      description: "corte de agua 1",
    });

    const id = 2;

    const response = await agent.get(`/resource/${id}`);
    expect(response.status).toBe(200);
  });

  test("GET API.GETBYID INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/resource").send({
      name: "Teste",
      description: "",
    });

    const id = 3;

    const response = await agent.get(`/resource/${id}`);

    expect(response.status).toBe(404);
  });

  test("PATCH API.UPDATE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/resource").send({
      name: "Teste Nome 1",
      description: "corte de agua 1",
    });

    const id = 2;
    const params = { name: "Mudou", description: "corte de agua ok" };

    const response = await agent.patch(`/resource/${id}`).send(params);

    expect(response.status).toBe(204);
  });

  test("PATCH API.UPDATE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/resource").send({
      name: "Teste Nome 1",
      description: "",
    });

    const id = 2;
    const params = { name: "Mudou" };

    const response = await agent.patch(`/resource/${id}`).send(params);

    expect(response.status).toBe(400);
  });

  test("DELETE API.REMOVE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/resource").send({
      name: "Teste Nome 1",
      description: "corte de agua 1",
    });

    const id = 2;

    const response = await agent.delete(`/resource/${id}`);

    expect(response.status).toBe(204);
  });

  test("DELETE API.REMOVE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "",
    });

    await agent.post("/resource").send({
      name: "Teste Nome 1",
      description: "corte de agua 1",
    });

    const id = 3;

    const response = await agent.delete(`/resource/${id}`);

    expect(response.status).toBe(400);
  });
});
