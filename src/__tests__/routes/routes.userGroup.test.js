const request = require("supertest");
const app = require("../../app");
const agent = request.agent(app);
require("dotenv").config({ path: ".env.test" });
const routes = require("../../routes/userGroup");

describe("Testes do banco de dados", () => {
  test("Deve retornar o codigo 200.", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.get("/userGroup");
    expect(response.status).toBe(200);
  });

  test("Deve inserir um novo usuário com informações válidas.", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.post("/userGroup").send({
      idUser: 1,
      idGroup: 1,
    });

    expect(response.status).toBe(204);
  });

  test("Deve retornar erro ao inserir usuário com informações inválidas.", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.post("/userGroup").send({
      idUser: "luigi",
      idGroup: 200,
    });

    expect(response.status).toBe(400);
  });

  test("POST API.SEARCH", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/userGroup").send({
      idUser: 1,
      idGroup: 1,
    });

    const params = [{ column: "idUser", signal: "=", value: 1 }];

    const response = await agent.post("/userGroup/search").send(params);

    expect(response.status).toBe(200);
  });

  test("POST API.SEARCH INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/userGroup").send({
      idUser: 100,
      idGroup: 200,
    });

    const params = [{ column: "idUser", signal: "=", value: "luigi" }];

    const response = await agent.post("/userGroup/search").send(params);

    expect(response.status).toBe(404);
  });

  test("GET API.GETBYID", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const id = 1;

    const response = await agent.get(`/userGroup/${id}`);
    expect(response.status).toBe(200);
  });

  test("GET API.GETBYID INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const id = 3;

    const response = await agent.get(`/userGroup/${id}`);

    expect(response.status).toBe(404);
  });

  test("PATCH API.UPDATE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const id = 1;
    const params = { idUser: 1, idGroup: 1 };

    const response = await agent.patch(`/userGroup/${id}`).send(params);

    expect(response.status).toBe(204);
  });

  test("PATCH API.UPDATE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const id = 1;
    const params = { name: "Mudou" };

    const response = await agent.patch(`/userGroup/${id}`).send(params);

    expect(response.status).toBe(400);
  });

  test("DELETE API.REMOVE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const id = 1;

    const response = await agent.delete(`/userGroup/${id}`);

    expect(response.status).toBe(204);
  });

  test("DELETE API.REMOVE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const id = 3;

    const response = await agent.delete(`/userGroup/${id}`);

    expect(response.status).toBe(400);
  });
});
