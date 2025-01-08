const request = require("supertest");
const app = require("../../app");
const agent = request.agent(app);

require("dotenv").config({ path: ".env.test" });
const routes = require("../../routes/vehicles");

describe("Testes do banco de dados", () => {
  test("GET", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.get("/vehicles");
    expect(response.status).toBe(200);
  });

  test("POST API.INSERT", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.post("/vehicles").send({
      make: "teste",
      model: "gol",
      yearOfManufacture: "2015",
      yearOfModel: "2005",
      licensePlate: "ays1012",
      color: "branco",
      chassisNumber: "9BWSU19FD8B302158",
      renavam: "00891353362",
      fuelType: "gasolina",
      tankCapacity: 50,
      mileage: 2,
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: "teste",
    });
    expect(response.status).toBe(204);
  });

  test("POST API.INSERT INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const response = await agent.post("/vehicles").send({
      make: "teste",
      model: "gol",
      yearOfManufacture: "2015",
      yearOfModel: "2005",
      licensePlate: "ays1012",
      color: "branco",
      chassisNumber: "9BWSU19FD8B302158",
      renavam: "00891353362",
      fuelType: "gasolina",
      tankCapacity: "",
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: "teste",
    });
    expect(response.status).toBe(400);
  });

  test("POST API.SEARCH", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/vehicles").send({
      make: "teste",
      model: "gol",
      yearOfManufacture: "2015",
      yearOfModel: "2005",
      licensePlate: "ays1012",
      color: "branco",
      chassisNumber: "9BWSU19FD8B302158",
      renavam: "00891353362",
      fuelType: "gasolina",
      tankCapacity: 50,
      mileage: 2,
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: "teste",
    });

    const params = [{ column: "make", signal: "=", value: "teste" }];

    const response = await agent.post("/vehicles/search").send(params);

    expect(response.status).toBe(200);
  });

  test("POST API.SEARCH INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/vehicles").send({
      make: "teste",
      model: "gol",
      yearOfManufacture: "2015",
      yearOfModel: "2005",
      licensePlate: "ays1012",
      color: "branco",
      chassisNumber: "9BWSU19FD8B302158",
      renavam: "00891353362",
      fuelType: "gasolina",
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: "teste",
    });

    const params = [{ column: "make", signal: "=", value: "15" }];

    const response = await agent.post("/vehicles/search").send(params);

    expect(response.status).toBe(404);
  });

  test("GET API.GETBYID", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const id = 1;

    const response = await agent.get(`/vehicles/${id}`);
    expect(response.status).toBe(200);
  });

  test("GET API.GETBYID INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/vehicles").send({
      make: "teste",
      model: "gol",
      yearOfManufacture: "2015",
      yearOfModel: "2005",
      licensePlate: "ays1012",
      color: "branco",
      chassisNumber: "9BWSU19FD8B302158",
      renavam: "00891353362",
      fuelType: "gasolina",
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: "teste",
    });

    const id = 3;

    const response = await agent.get(`/vehicles/${id}`);

    expect(response.status).toBe(404);
  });

  test("PATCH API.UPDATE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/vehicles").send({
      make: "teste",
      model: "gol",
      yearOfManufacture: "2015",
      yearOfModel: "2005",
      licensePlate: "ays1012",
      color: "branco",
      chassisNumber: "9BWSU19FD8B302158",
      renavam: "00891353362",
      fuelType: "gasolina",
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: "teste",
    });

    const id = 2;
    const params = {
      make: "Mudou",
      model: "gol 2",
      yearOfManufacture: "2013",
      yearOfModel: "2010",
      licensePlate: "ays1020",
      color: "branco",
      chassisNumber: "9BWSU19FD8B321421",
      renavam: "0000000111",
      fuelType: "alcool",
      tankCapacity: 33,
      mileage: 1,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 1,
      purchaseValue: 1,
      purchaseDate: 1,
      purchaseSupplier: 1,
      notes: "teste 1",
    };

    const response = await agent.patch(`/vehicles/${id}`).send(params);

    expect(response.status).toBe(204);
  });

  test("PATCH API.UPDATE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/vehicles").send({
      make: "teste",
      model: "gol",
      yearOfManufacture: "2015",
      yearOfModel: "2005",
      licensePlate: "ays1012",
      color: "branco",
      chassisNumber: "9BWSU19FD8B302158",
      renavam: "00891353362",
      fuelType: "gasolina",
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: "teste",
    });

    const id = 2;
    const params = { make: "Mudou" };

    const response = await agent.patch(`/vehicles/${id}`).send(params);

    expect(response.status).toBe(400);
  });

  test("DELETE API.REMOVE", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/vehicles").send({
      make: "teste",
      model: "gol",
      yearOfManufacture: "2015",
      yearOfModel: "2005",
      licensePlate: "ays1012",
      color: "branco",
      chassisNumber: "9BWSU19FD8B302158",
      renavam: "00891353362",
      fuelType: "gasolina",
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: "teste",
    });

    const id = 1;

    const response = await agent.delete(`/vehicles/${id}`);

    expect(response.status).toBe(204);
  });

  test("DELETE API.REMOVE INCORRETO", async () => {
    await agent.post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await agent.post("/vehicles").send({
      make: "teste",
      model: "gol",
      yearOfManufacture: "2015",
      yearOfModel: "2005",
      licensePlate: "ays1012",
      color: "branco",
      chassisNumber: "9BWSU19FD8B302158",
      renavam: "00891353362",
      fuelType: "gasolina",
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: "teste",
    });

    const id = 3;

    const response = await agent.delete(`/vehicles/${id}`);

    expect(response.status).toBe(400);
  });
});
