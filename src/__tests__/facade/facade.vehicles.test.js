const request = require("supertest");
const app = require("../../app");
require("dotenv").config({ path: ".env.test" });
const facade = require("../../facade/vehicles");

describe("Testes do banco de dados", () => {
  test("INSERT", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
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
    };
    const result = await facade.insert(object);

    expect(result).toEqual([2]);
  });

  test("INSERT + GET", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object1 = {
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
    };
    await facade.insert(object1);

    const object2 = {
      make: "teste",
      model: "kwid",
      yearOfManufacture: "2018",
      yearOfModel: "2010",
      licensePlate: "ays2015",
      color: "preto",
      chassisNumber: "9BWSU19FD8B307892",
      renavam: "00891353123",
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
    };
    await facade.insert(object2);

    const result = await facade.get();
    expect(result).toHaveLength(3);
    result.forEach((obj) => {
      expect(obj).toHaveProperty("id");
      expect(obj).toHaveProperty("make");
      expect(obj).toHaveProperty("model");
      expect(obj).toHaveProperty("yearOfManufacture");
      expect(obj).toHaveProperty("yearOfModel");
      expect(obj).toHaveProperty("licensePlate");
      expect(obj).toHaveProperty("color");
      expect(obj).toHaveProperty("chassisNumber");
      expect(obj).toHaveProperty("renavam");
      expect(obj).toHaveProperty("tankCapacity");
      expect(obj).toHaveProperty("mileage");
      expect(obj).toHaveProperty("lastMaintenanceDate");
      expect(obj).toHaveProperty("nextMaintenanceDate");
      expect(obj).toHaveProperty("status");
      expect(obj).toHaveProperty("purchaseValue");
      expect(obj).toHaveProperty("purchaseDate");
      expect(obj).toHaveProperty("purchaseSupplier");
      expect(obj).toHaveProperty("notes");
      expect(obj).toHaveProperty("createdAt");
      expect(obj).toHaveProperty("updatedAt");
      expect(obj).toHaveProperty("deletedAt");
    });
  });

  test("INSERT + GET BY ID", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
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
    };
    await facade.insert(object);

    const result = await facade.getById(2);

    expect(result).toHaveProperty("id", 2);
    expect(result).toHaveProperty("make", "teste");
    expect(result).toHaveProperty("model", "gol");
    expect(result).toHaveProperty("yearOfManufacture", "2015");
    expect(result).toHaveProperty("yearOfModel", "2005");
    expect(result).toHaveProperty("licensePlate", "ays1012");
    expect(result).toHaveProperty("color", "branco");
    expect(result).toHaveProperty("chassisNumber", "9BWSU19FD8B302158");
    expect(result).toHaveProperty("renavam", "00891353362");
    expect(result).toHaveProperty("fuelType", "gasolina");
    expect(result).toHaveProperty("tankCapacity", 50);
    expect(result).toHaveProperty("mileage", 2);
    expect(result).toHaveProperty("lastMaintenanceDate");
    expect(result).toHaveProperty("nextMaintenanceDate");
    expect(result).toHaveProperty("status", 2);
    expect(result).toHaveProperty("purchaseValue", 2);
    expect(result).toHaveProperty("purchaseDate", 2);
    expect(result).toHaveProperty("purchaseSupplier", 2);
    expect(result).toHaveProperty("notes", "teste");
    expect(result).toHaveProperty("createdAt");
    expect(result).toHaveProperty("updatedAt");
    expect(result).toHaveProperty("deletedAt");
  });

  test("INSERT + SEARCH PADRÃO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
      make: "make",
      model: "modelo",
      yearOfManufacture: "ano de fabricação",
      yearOfModel: "Ano de modelo",
      licensePlate: "placa de carro",
      color: "cor",
      chassisNumber: "número do chassi",
      renavam: "renavam",
      fuelType: "tipo de combustível",
      tankCapacity: 55,
      mileage: 1,
      status: 10,
      purchaseValue: 1,
      purchaseDate: 1,
      purchaseSupplier: 1,
      notes: "notas",
    };
    await facade.insert(object);

    const params = [{ column: "make", signal: "=", value: "make" }];
    result = await facade.search(params);

    expect(result).toMatchObject([object]);
  });

  test("INSERT + SEARCH AND", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
      make: "make",
      model: "modelo",
      yearOfManufacture: "ano de fabricação",
      yearOfModel: "Ano de modelo",
      licensePlate: "placa de carro",
      color: "cor",
      chassisNumber: "número do chassi",
      renavam: "renavam",
      fuelType: "tipo de combustível",
      tankCapacity: 55,
      mileage: 1,
      status: 10,
      purchaseValue: 1,
      purchaseDate: 1,
      purchaseSupplier: 1,
      notes: "notas",
    };
    await facade.insert(object);

    const params = [
      { column: "make", signal: "=", value: "make", operator: "AND" },
    ];
    result = await facade.search(params);

    expect(result).toMatchObject([object]);
  });

  test("INSERT + SEARCH OR", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
      make: "make",
      model: "modelo",
      yearOfManufacture: "ano de fabricação",
      yearOfModel: "Ano de modelo",
      licensePlate: "placa de carro",
      color: "cor",
      chassisNumber: "número do chassi",
      renavam: "renavam",
      fuelType: "tipo de combustível",
      tankCapacity: 55,
      mileage: 1,
      status: 10,
      purchaseValue: 1,
      purchaseDate: 1,
      purchaseSupplier: 1,
      notes: "notas",
    };
    await facade.insert(object);

    const params = [
      { column: "make", signal: "=", value: "make", operator: "OR" },
    ];
    result = await facade.search(params);

    expect(result).toMatchObject([object]);
  });

  test("INSERT + SEARCH LIKE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
      make: "make",
      model: "modelo",
      yearOfManufacture: "ano de fabricação",
      yearOfModel: "Ano de modelo",
      licensePlate: "placa de carro",
      color: "cor",
      chassisNumber: "número do chassi",
      renavam: "renavam",
      fuelType: "tipo de combustível",
      tankCapacity: 55,
      mileage: 1,
      status: 10,
      purchaseValue: 1,
      purchaseDate: 1,
      purchaseSupplier: 1,
      notes: "notas",
    };
    await facade.insert(object);

    const params = [
      { column: "make", signal: "=", value: "make", operator: "LIKE" },
    ];
    result = await facade.search(params);

    expect(result).toMatchObject([object]);
  });

  test("INSERT + SEARCH IN", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object1 = {
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
    };
    await facade.insert(object1);

    const object2 = {
      make: "teste",
      model: "kwid",
      yearOfManufacture: "2018",
      yearOfModel: "2010",
      licensePlate: "ays2015",
      color: "preto",
      chassisNumber: "9BWSU19FD8B307892",
      renavam: "00891353123",
      fuelType: "gasolina",
      tankCapacity: 50,
      mileage: 2,
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: "teste",
    };
    await facade.insert(object2);

    const params = [
      {
        column: "model",
        signal: "=",
        value: ["gol", "kwid"],
        operator: "IN",
      },
    ];

    result = await facade.search(params);

    expect(result).toHaveLength(2);
  });

  test("INSERT + UPDATE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object1 = {
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
    };
    await facade.insert(object1);

    const resultGet = await facade.getById(2);

    expect(resultGet).toHaveProperty("id", 2);
    expect(resultGet).toHaveProperty("make", "teste");
    expect(resultGet).toHaveProperty("model", "gol");
    expect(resultGet).toHaveProperty("yearOfManufacture", "2015");
    expect(resultGet).toHaveProperty("yearOfModel", "2005");
    expect(resultGet).toHaveProperty("licensePlate", "ays1012");
    expect(resultGet).toHaveProperty("color", "branco");
    expect(resultGet).toHaveProperty("chassisNumber", "9BWSU19FD8B302158");
    expect(resultGet).toHaveProperty("renavam", "00891353362");
    expect(resultGet).toHaveProperty("fuelType", "gasolina");
    expect(resultGet).toHaveProperty("tankCapacity", 50);
    expect(resultGet).toHaveProperty("mileage", 2);
    expect(resultGet).toHaveProperty("lastMaintenanceDate");
    expect(resultGet).toHaveProperty("nextMaintenanceDate");
    expect(resultGet).toHaveProperty("status", 2);
    expect(resultGet).toHaveProperty("purchaseValue", 2);
    expect(resultGet).toHaveProperty("purchaseDate", 2);
    expect(resultGet).toHaveProperty("purchaseSupplier", 2);
    expect(resultGet).toHaveProperty("notes", "teste");

    const object2 = {
      make: "teste",
      model: "kwid",
      yearOfManufacture: "2018",
      yearOfModel: "2010",
      licensePlate: "ays2015",
      color: "preto",
      chassisNumber: "9BWSU19FD8B307892",
      renavam: "00891353123",
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
    };

    await facade.update(object2, 2);

    const resultGet2 = await facade.getById(2);

    expect(resultGet2).toHaveProperty("id", 2);
    expect(resultGet2).toHaveProperty("make", "teste");
    expect(resultGet2).toHaveProperty("model", "kwid");
    expect(resultGet2).toHaveProperty("yearOfManufacture", "2018");
    expect(resultGet2).toHaveProperty("yearOfModel", "2010");
    expect(resultGet2).toHaveProperty("licensePlate", "ays2015");
    expect(resultGet2).toHaveProperty("color", "preto");
    expect(resultGet2).toHaveProperty("chassisNumber", "9BWSU19FD8B307892");
    expect(resultGet2).toHaveProperty("renavam", "00891353123");
    expect(resultGet2).toHaveProperty("fuelType", "gasolina");
    expect(resultGet2).toHaveProperty("tankCapacity", 50);
    expect(resultGet2).toHaveProperty("mileage", 2);
    expect(resultGet2).toHaveProperty("lastMaintenanceDate");
    expect(resultGet2).toHaveProperty("nextMaintenanceDate");
    expect(resultGet2).toHaveProperty("status", 2);
    expect(resultGet2).toHaveProperty("purchaseValue", 2);
    expect(resultGet2).toHaveProperty("purchaseDate", 2);
    expect(resultGet2).toHaveProperty("purchaseSupplier", 2);
    expect(resultGet2).toHaveProperty("notes", "teste");
  });

  test("INSERT + GET + DELETE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object1 = {
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
    };
    await facade.insert(object1);

    const result = await facade.get();
    expect(result).toHaveLength(2);

    await facade.remove(2);

    const result2 = await facade.get();
    expect(result2).toHaveLength(1);
  });

  test("INSERT INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = { teste: "vehicles" };
    const result = await facade.insert(object);

    expect(result).toEqual({
      errors: ['"licensePlate" is required', '"teste" is not allowed'],
    });
  });

  test("GET VAZIO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    await facade.remove(1);

    const result = await facade.get();
    expect(result).toHaveLength(0);
  });

  test("INSERT + GET BY ID INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object1 = {
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
    };
    await facade.insert(object1);

    const result = await facade.getById(3);
    expect(result).toBe(undefined);
  });

  test("INSERT + SEARCH PADRÃO INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
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
    };
    await facade.insert(object);

    const params = [{ column: "Aleatorio", signal: "=", value: "Aleatorio" }];
    result = await facade.search(params);

    expect(result).toBe(false);
  });

  test("INSERT + SEARCH AND INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
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
    };
    await facade.insert(object);

    const params = [
      { column: "Aleatorio", signal: "=", value: "Aleatorio", operator: "AND" },
    ];
    result = await facade.search(params);

    expect(result).toBe(false);
  });

  test("INSERT + SEARCH OR", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
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
    };
    await facade.insert(object);

    const params = [
      { column: "Aleatorio", signal: "=", value: "Aleatorio", operator: "OR" },
    ];
    result = await facade.search(params);

    expect(result).toBe(false);
  });

  test("INSERT + SEARCH LIKE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
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
    };
    await facade.insert(object);

    const params = [
      {
        column: "Aleatorio",
        signal: "=",
        value: "Aleatorio",
        operator: "LIKE",
      },
    ];
    result = await facade.search(params);

    expect(result).toBe(false);
  });

  test("INSERT + SEARCH IN", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object1 = {
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
    };
    await facade.insert(object1);

    const object2 = {
      make: "teste",
      model: "kwid",
      yearOfManufacture: "2018",
      yearOfModel: "2010",
      licensePlate: "ays2015",
      color: "preto",
      chassisNumber: "9BWSU19FD8B307892",
      renavam: "00891353123",
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
    };
    await facade.insert(object2);

    const params = [
      {
        column: "Aleatorio",
        signal: "=",
        value: ["Aleatorio", "Aleatorio"],
        operator: "IN",
      },
    ];

    result = await facade.search(params);

    expect(result).toBe(false);
  });

  test("INSERT + UPDATE INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object1 = {
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
    };
    await facade.insert(object1);

    const resultGet = await facade.getById(2);

    expect(resultGet).toHaveProperty("id", 2);
    expect(resultGet).toHaveProperty("make", "teste");
    expect(resultGet).toHaveProperty("model", "gol");
    expect(resultGet).toHaveProperty("yearOfManufacture", "2015");
    expect(resultGet).toHaveProperty("yearOfModel", "2005");
    expect(resultGet).toHaveProperty("licensePlate", "ays1012");
    expect(resultGet).toHaveProperty("color", "branco");
    expect(resultGet).toHaveProperty("chassisNumber", "9BWSU19FD8B302158");
    expect(resultGet).toHaveProperty("renavam", "00891353362");
    expect(resultGet).toHaveProperty("fuelType", "gasolina");
    expect(resultGet).toHaveProperty("tankCapacity", 50);
    expect(resultGet).toHaveProperty("mileage", 2);
    expect(resultGet).toHaveProperty("lastMaintenanceDate");
    expect(resultGet).toHaveProperty("nextMaintenanceDate");
    expect(resultGet).toHaveProperty("status", 2);
    expect(resultGet).toHaveProperty("purchaseValue", 2);
    expect(resultGet).toHaveProperty("purchaseDate", 2);
    expect(resultGet).toHaveProperty("purchaseSupplier", 2);
    expect(resultGet).toHaveProperty("notes", "teste");

    const object2 = {
      make: "teste",
      model: "kwid",
      yearOfManufacture: "2018",
      yearOfModel: "2010",
      color: "preto",
      chassisNumber: "9BWSU19FD8B307892",
      renavam: "00891353123",
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
      TESTE: "2121",
    };

    result = await facade.update(object2, 2);
    console.log(result);
    expect(result).toEqual({
      errors: ['"licensePlate" is required', '"TESTE" is not allowed'],
    });
  });

  test("INSERT + DELETE INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object1 = {
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
    };
    await facade.insert(object1);

    result = await facade.remove(3);

    expect(result).toBe(0);
  });
});
