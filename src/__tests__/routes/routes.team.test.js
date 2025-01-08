const request = require("supertest");
const app = require("../../app");
const agent = request.agent(app);

require("dotenv").config({ path: ".env.test" });
const routes = require("../../routes/equipes");

describe("Testes do banco de dados", () => {
  test("GET", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.get("/team");
    expect(response.status).toBe(200);
  });

  test("POST API.INSERT", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.post("/team").send({
      name: "team1",
      idVehicle: 1,
    });
    expect(response.status).toBe(204);
  });

  test("POST API.INSERT INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.post("/team").send({
      name: "team",
      idVehicle: "",
    });
    expect(response.status).toBe(400);
  });

  test("POST API.SEARCH", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/team").send({
      name: "team1",
      idVehicle: 1,
    });

    const params = [{ column: "name", signal: "=", value: "team1" }];

    const response = await agent.post("/team/search").send(params);

    expect(response.status).toBe(200);
  });

  test("POST API.SEARCH INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/team").send({
      name: "team1",
      idVehicle: 1,
    });

    const params = [{ column: "name", signal: "=", value: "15" }];

    const response = await agent.post("/team/search").send(params);

    expect(response.status).toBe(404);
  });

  test("GET API.GETBYID", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/team").send({
      name: "team1",
      idVehicle: 1,
    });

    const id = 1;

    const response = await agent.get(`/team/${id}`);
    expect(response.status).toBe(200);
  });

  test("GET API.GETBYID INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/team").send({
      name: "",
      idVehicle: 1,
    });

    const id = 2;

    const response = await agent.get(`/team/${id}`);

    expect(response.status).toBe(404);
  });

  test("PATCH API.UPDATE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/user").send({
      name: "team1",
      idVehicle: 1,
    });

    const id = 1;
    const params = { name: "team2", idVehicle: 2 };

    const response = await agent.patch(`/team/${id}`).send(params);

    expect(response.status).toBe(204);
  });

  test("PATCH API.UPDATE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/team").send({
      name: "team1",
      idVehicle: 1,
    });

    const id = 1;
    const params = { name: "Mudou" };

    const response = await agent.patch(`/team/${id}`).send(params);

    expect(response.status).toBe(400);
  });

  test("DELETE API.REMOVE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/team").send({
      name: "team1",
      idVehicle: 1,
    });

    const id = 1;

    const response = await agent.delete(`/team/${id}`);

    expect(response.status).toBe(204);
  });

  test("DELETE API.REMOVE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/team").send({
      name: "",
      idVehicle: 1,
    });

    const id = 2;

    const response = await agent.delete(`/team/${id}`);
    // console.log(response);

    expect(response.status).toBe(400);
  });
});
