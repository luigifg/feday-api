const request = require("supertest");
const app = require("../../app");
require("dotenv").config({ path: ".env.test" });
const facade = require("../../facade/userGroup");

describe("Testes do banco de dados", () => {
  test("INSERT", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
      idUser: 1,
      idGroup: 1,
    };

    const result = await facade.insert(object);

    expect(result).toEqual([2]);
  }); //TESTAR

  test("INSERT 2 + GET", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object1 = {
      idUser: 1,
      idGroup: 1,
    };

    await facade.insert(object1);

    const result = await facade.get();
    expect(result).toHaveLength(2);
    result.forEach((obj) => {
      expect(obj).toHaveProperty("id");
      expect(obj).toHaveProperty("idUser");
      expect(obj).toHaveProperty("idGroup");
    });
  }); //TESTAR

  test("INSERT + GET BY ID", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
      idUser: 1,
      idGroup: 1,
    };

    await facade.insert(object);

    const result = await facade.getById(2);

    expect(result).toHaveProperty("id", 2);
    expect(result).toHaveProperty("idUser", 1);
    expect(result).toHaveProperty("idGroup", 1);
  });

  test("SEARCH PADRÃO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
      idUser: 1,
      idGroup: 1,
    }

    const params = [{ column: "idUser", signal: "=", value: "1" }];
    result = await facade.search(params);

    expect(result).toMatchObject([object]);
  }); //testar

  test("SEARCH AND", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
      idUser: 1,
      idGroup: 1,
    }

    const params = [
      { column: "idUser", signal: "=", value: "1", operator: "AND" },
    ];
    result = await facade.search(params);

    expect(result).toMatchObject([object]);
  }); //TESTAR

  test("SEARCH OR", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
      idUser: 1,
      idGroup: 1,
    }

    const params = [
      { column: "idUser", signal: "=", value: "1", operator: "OR" },
    ];
    result = await facade.search(params);

    expect(result).toMatchObject([object]);
  }); //TESTAR

  test("SEARCH LIKE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
      idUser: 1,
      idGroup: 1,
    }
    
    const params = [
      { column: "idUser", signal: "=", value: "1", operator: "LIKE" },
    ];
    result = await facade.search(params);

    expect(result).toMatchObject([object]);
  }); 

  test("INSERT + SEARCH IN", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
      idUser: 1,
      idGroup: 1,
    }

    await facade.insert(object);

    const params = [
      {
        column: "idUser",
        signal: "=",
        value: ["1", "1"],
        operator: "IN",
      },
    ];

    result = await facade.search(params);

    expect(result).toHaveLength(2);
  }); //TESTAR

  test("UPDATE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = {
      idUser: 1,
      idGroup: 1,
    }

    await facade.update(object, 1);

    const resultGet2 = await facade.getById(1);

    expect(resultGet2).toHaveProperty("id", 1);
    expect(resultGet2).toHaveProperty("idUser", 1);
    expect(resultGet2).toHaveProperty("idGroup", 1);
  }); //testar

  test("GET + DELETE", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const result = await facade.get();
    expect(result).toHaveLength(1);

    await facade.remove(1);

    const result2 = await facade.get();
    expect(result2).toHaveLength(0);
  }); //testar

  test("INSERT INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object = { teste: "service" };
    const result = await facade.insert(object);

    expect(result).toEqual({
      errors: [
        '"idUser" is required',
        '"idGroup" is required',
        '"teste" is not allowed',
      ],
    });
  }); //dar um console no result

  test("GET VAZIO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const result = await facade.get();
    expect(result).toHaveLength(1);
  }); //testar

  test("GET BY ID INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const result = await facade.getById(3);
    expect(result).toBe(undefined);
  }); //testar

  test("SEARCH PADRÃO INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const params = [{ column: "Aleatorio", signal: "=", value: "Aleatorio" }];
    result = await facade.search(params);

    expect(result).toBe(false);
  }); //testar

  test("SEARCH AND INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const params = [
      { column: "Aleatorio", signal: "=", value: "Aleatorio", operator: "AND" },
    ];
    result = await facade.search(params);

    expect(result).toBe(false);
  });

  test("SEARCH OR INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const params = [
      { column: "Aleatorio", signal: "=", value: "Aleatorio", operator: "OR" },
    ];
    result = await facade.search(params);

    expect(result).toBe(false);
  });

  test("SEARCH LIKE INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

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

  test("SEARCH IN INCORRETO ", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object2 = {
      idUser: 1,
      idGroup: 1,
    };

    await facade.insert(object2);

    const params = [
      {
        column: "Aleatorio",
        signal: "=",
        value: ["1", "1"],
        operator: "IN",
      },
    ];

    result = await facade.search(params);

    expect(result).toBe(false);
  });

  test("UPDATE INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object2 = {
      idGroup: 1,
      TESTE: "12345",
    };

    result = await facade.update(object2, 2);
    expect(result).toEqual({
      errors: ['"idUser" is required', '"TESTE" is not allowed'],
    });
  }); //ajustar

  test("INSERT + DELETE INCORRETO", async () => {
    await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123",
    });

    const object1 = {
      idUser: 1,
      idGroup: 1,
    };

    await facade.insert(object1);

    result = await facade.remove(2);

    expect(result).toBe(1);
  });
});
