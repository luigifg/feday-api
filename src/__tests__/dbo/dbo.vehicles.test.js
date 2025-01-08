const request = require('supertest')
const app = require('../../app')
require('dotenv').config({ path: '.env.test' })
const dbo = require('../../dbo/base')
const { messages } = require('joi-translation-pt-br')
const tableName = 'vehicles'

// verificar se a data vai ser colocada na mão

describe('Testes do banco de dados', () => {
  test('INSERT', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      make: 'teste',
      model: 'gol',
      yearOfManufacture: '2015',
      yearOfModel: '2005',
      licensePlate: 'ays1012',
      color: 'branco',
      chassisNumber: '9BWSU19FD8B302158',
      renavam: '00891353362',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    const result = await dbo.insert(object, tableName)
    expect(result).toEqual([2])
  })

  test('INSERT 2 + GET ALL', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      make: 'teste',
      model: 'gol',
      yearOfManufacture: '2015',
      yearOfModel: '2005',
      licensePlate: 'ays1012',
      color: 'branco',
      chassisNumber: '9BWSU19FD8B302158',
      renavam: '00891353362',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object1, tableName)

    const object2 = {
      make: 'teste',
      model: 'kwid',
      yearOfManufacture: '2018',
      yearOfModel: '2010',
      licensePlate: 'ays2015',
      color: 'preto',
      chassisNumber: '9BWSU19FD8B307892',
      renavam: '00891353123',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object2, tableName)

    const result = await dbo.get(tableName)
    expect(result).toHaveLength(3)
    result.forEach((obj) => {
      expect(obj).toHaveProperty('id')
      expect(obj).toHaveProperty('make')
      expect(obj).toHaveProperty('model')
      expect(obj).toHaveProperty('yearOfManufacture')
      expect(obj).toHaveProperty('yearOfModel')
      expect(obj).toHaveProperty('licensePlate')
      expect(obj).toHaveProperty('color')
      expect(obj).toHaveProperty('chassisNumber')
      expect(obj).toHaveProperty('renavam')
      expect(obj).toHaveProperty('tankCapacity')
      expect(obj).toHaveProperty('mileage')
      expect(obj).toHaveProperty('lastMaintenanceDate')
      expect(obj).toHaveProperty('nextMaintenanceDate')
      expect(obj).toHaveProperty('status')
      expect(obj).toHaveProperty('purchaseValue')
      expect(obj).toHaveProperty('purchaseDate')
      expect(obj).toHaveProperty('purchaseSupplier')
      expect(obj).toHaveProperty('notes')
      expect(obj).toHaveProperty('createdAt')
      expect(obj).toHaveProperty('updatedAt')
      expect(obj).toHaveProperty('deletedAt')
    })
  })

  test('INSERT + GET BY ID', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      make: 'teste',
      model: 'gol',
      yearOfManufacture: '2015',
      yearOfModel: '2005',
      licensePlate: 'ays1012',
      color: 'branco',
      chassisNumber: '9BWSU19FD8B302158',
      renavam: '00891353362',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object1, tableName)

    const result = await dbo.getById(2, tableName)

    expect(result).toHaveProperty('id', 2)
    expect(result).toHaveProperty('make', 'teste')
    expect(result).toHaveProperty('model', 'gol')
    expect(result).toHaveProperty('yearOfManufacture', '2015')
    expect(result).toHaveProperty('yearOfModel', '2005')
    expect(result).toHaveProperty('licensePlate', 'ays1012')
    expect(result).toHaveProperty('color', 'branco')
    expect(result).toHaveProperty('chassisNumber', '9BWSU19FD8B302158')
    expect(result).toHaveProperty('renavam', '00891353362')
    expect(result).toHaveProperty('fuelType', 'gasolina')
    expect(result).toHaveProperty('tankCapacity', 50)
    expect(result).toHaveProperty('mileage', 2)
    expect(result).toHaveProperty('lastMaintenanceDate')
    expect(result).toHaveProperty('nextMaintenanceDate')
    expect(result).toHaveProperty('status', 2)
    expect(result).toHaveProperty('purchaseValue', 2)
    expect(result).toHaveProperty('purchaseDate', 2)
    expect(result).toHaveProperty('purchaseSupplier', 2)
    expect(result).toHaveProperty('notes', 'teste')
    expect(result).toHaveProperty('createdAt')
    expect(result).toHaveProperty('updatedAt')
    expect(result).toHaveProperty('deletedAt')
  })

  test('UPDATE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      make: 'teste',
      model: 'gol',
      yearOfManufacture: '2015',
      yearOfModel: '2005',
      licensePlate: 'ays1012',
      color: 'branco',
      chassisNumber: '9BWSU19FD8B302158',
      renavam: '00891353362',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object1, tableName)

    const resultGet = await dbo.getById(2, tableName)

    expect(resultGet).toHaveProperty('id', 2)
    expect(resultGet).toHaveProperty('make', 'teste')
    expect(resultGet).toHaveProperty('model', 'gol')
    expect(resultGet).toHaveProperty('yearOfManufacture', '2015')
    expect(resultGet).toHaveProperty('yearOfModel', '2005')
    expect(resultGet).toHaveProperty('licensePlate', 'ays1012')
    expect(resultGet).toHaveProperty('color', 'branco')
    expect(resultGet).toHaveProperty('chassisNumber', '9BWSU19FD8B302158')
    expect(resultGet).toHaveProperty('renavam', '00891353362')
    expect(resultGet).toHaveProperty('fuelType', 'gasolina')
    expect(resultGet).toHaveProperty('tankCapacity', 50)
    expect(resultGet).toHaveProperty('mileage', 2)
    expect(resultGet).toHaveProperty('lastMaintenanceDate')
    expect(resultGet).toHaveProperty('nextMaintenanceDate')
    expect(resultGet).toHaveProperty('status', 2)
    expect(resultGet).toHaveProperty('purchaseValue', 2)
    expect(resultGet).toHaveProperty('purchaseDate', 2)
    expect(resultGet).toHaveProperty('purchaseSupplier', 2)
    expect(resultGet).toHaveProperty('notes', 'teste')

    const object2 = {
      make: 'teste',
      model: 'kwid',
      yearOfManufacture: '2018',
      yearOfModel: '2010',
      licensePlate: 'ays2015',
      color: 'preto',
      chassisNumber: '9BWSU19FD8B307892',
      renavam: '00891353123',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }

    await dbo.update(object2, 2, tableName)

    const resultGet2 = await dbo.getById(2, tableName)

    expect(resultGet2).toHaveProperty('id', 2)
    expect(resultGet2).toHaveProperty('make', 'teste')
    expect(resultGet2).toHaveProperty('model', 'kwid')
    expect(resultGet2).toHaveProperty('yearOfManufacture', '2018')
    expect(resultGet2).toHaveProperty('yearOfModel', '2010')
    expect(resultGet2).toHaveProperty('licensePlate', 'ays2015')
    expect(resultGet2).toHaveProperty('color', 'preto')
    expect(resultGet2).toHaveProperty('chassisNumber', '9BWSU19FD8B307892')
    expect(resultGet2).toHaveProperty('renavam', '00891353123')
    expect(resultGet2).toHaveProperty('fuelType', 'gasolina')
    expect(resultGet2).toHaveProperty('tankCapacity', 50)
    expect(resultGet2).toHaveProperty('mileage', 2)
    expect(resultGet2).toHaveProperty('lastMaintenanceDate')
    expect(resultGet2).toHaveProperty('nextMaintenanceDate')
    expect(resultGet2).toHaveProperty('status', 2)
    expect(resultGet2).toHaveProperty('purchaseValue', 2)
    expect(resultGet2).toHaveProperty('purchaseDate', 2)
    expect(resultGet2).toHaveProperty('purchaseSupplier', 2)
    expect(resultGet2).toHaveProperty('notes', 'teste')
  })

  test('SEARCH PADRÃO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      make: 'make',
      model: 'modelo',
      yearOfManufacture: 'ano de fabricação',
      yearOfModel: 'Ano de modelo',
      licensePlate: 'placa de carro',
      color: 'cor',
      chassisNumber: 'número do chassi',
      renavam: 'renavam',
      fuelType: 'tipo de combustível',
      tankCapacity: 55,
      mileage: 1,
      status: 10,
      purchaseValue: 1,
      purchaseDate: 1,
      purchaseSupplier: 1,
      notes: 'notas',
    }

    const params = [{ column: 'make', signal: '=', value: 'make' }]
    result = await dbo.search(tableName, params)
    expect(result).toMatchObject([object])
  })

  test('INSERT + SEARCH AND', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      make: 'make',
      model: 'modelo',
      yearOfManufacture: 'ano de fabricação',
      yearOfModel: 'Ano de modelo',
      licensePlate: 'placa de carro',
      color: 'cor',
      chassisNumber: 'número do chassi',
      renavam: 'renavam',
      fuelType: 'tipo de combustível',
      tankCapacity: 55,
      mileage: 1,
      status: 10,
      purchaseValue: 1,
      purchaseDate: 1,
      purchaseSupplier: 1,
      notes: 'notas',
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'make', signal: '=', value: 'make', operator: 'AND' }]
    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('INSERT + SEARCH OR', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      make: 'make',
      model: 'modelo',
      yearOfManufacture: 'ano de fabricação',
      yearOfModel: 'Ano de modelo',
      licensePlate: 'placa de carro',
      color: 'cor',
      chassisNumber: 'número do chassi',
      renavam: 'renavam',
      fuelType: 'tipo de combustível',
      tankCapacity: 55,
      mileage: 1,
      status: 10,
      purchaseValue: 1,
      purchaseDate: 1,
      purchaseSupplier: 1,
      notes: 'notas',
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'make', signal: '=', value: 'make', operator: 'OR' }]
    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('INSERT + SEARCH LIKE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      make: 'make',
      model: 'modelo',
      yearOfManufacture: 'ano de fabricação',
      yearOfModel: 'Ano de modelo',
      licensePlate: 'placa de carro',
      color: 'cor',
      chassisNumber: 'número do chassi',
      renavam: 'renavam',
      fuelType: 'tipo de combustível',
      tankCapacity: 55,
      mileage: 1,
      status: 10,
      purchaseValue: 1,
      purchaseDate: 1,
      purchaseSupplier: 1,
      notes: 'notas',
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'make', signal: '=', value: 'make', operator: 'LIKE' }]
    result = await dbo.search(tableName, params)

    expect(result).toMatchObject([object])
  })

  test('INSERT + SEARCH IN', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      make: 'teste',
      model: 'gol',
      yearOfManufacture: '2015',
      yearOfModel: '2005',
      licensePlate: 'ays1012',
      color: 'branco',
      chassisNumber: '9BWSU19FD8B302158',
      renavam: '00891353362',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object1, tableName)

    const object2 = {
      make: 'teste 2',
      model: 'kwid',
      yearOfManufacture: '2018',
      yearOfModel: '2010',
      licensePlate: 'ays2015',
      color: 'preto',
      chassisNumber: '9BWSU19FD8B307892',
      renavam: '00891353123',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object2, tableName)

    const params = [
      {
        column: 'make',
        signal: '=',
        value: ['teste', 'teste 2'],
        operator: 'IN',
      },
    ]

    result = await dbo.search(tableName, params)

    expect(result).toHaveLength(2)
  })

  test('INSERT + GET + DELETE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      make: 'teste',
      model: 'gol',
      yearOfManufacture: '2015',
      yearOfModel: '2005',
      licensePlate: 'ays1012',
      color: 'branco',
      chassisNumber: '9BWSU19FD8B302158',
      renavam: '00891353362',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object1, tableName)

    const result = await dbo.get(tableName)
    expect(result).toHaveLength(2)

    await dbo.remove(1, tableName)

    const result2 = await dbo.get(tableName)
    expect(result2).toHaveLength(1)
  })

  test('INSERT + GET + CLEAR', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      make: 'teste',
      model: 'gol',
      yearOfManufacture: '2015',
      yearOfModel: '2005',
      licensePlate: 'ays1012',
      color: 'branco',
      chassisNumber: '9BWSU19FD8B302158',
      renavam: '00891353362',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object1, tableName)

    const result = await dbo.get(tableName)
    expect(result).toHaveLength(2)

    await dbo.clear(tableName)

    const result2 = await dbo.get(tableName)
    expect(result2).toHaveLength(0)
  })

  test('INSERT INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = { teste: 'User' }
    const result = await dbo.insert(object, tableName)
    expect(result.errors)
  })

  test('GET VAZIO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const result = await dbo.get('teste')
    expect(result).toHaveLength(0)
  })

  test('INSERT + GET BY ID INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      make: 'teste',
      model: 'gol',
      yearOfManufacture: '2015',
      yearOfModel: '2005',
      licensePlate: 'ays1012',
      color: 'branco',
      chassisNumber: '9BWSU19FD8B302158',
      renavam: '00891353362',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object1, tableName)

    const result = await dbo.getById(3, tableName)
    expect(result).toBe(undefined)
  })

  test('INSERT + UPDATE INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      make: 'teste',
      model: 'gol',
      yearOfManufacture: '2015',
      yearOfModel: '2005',
      licensePlate: 'ays1012',
      color: 'branco',
      chassisNumber: '9BWSU19FD8B302158',
      renavam: '00891353362',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object1, tableName)

    const resultGet = await dbo.getById(2, tableName)

    expect(resultGet).toHaveProperty('id', 2)
    expect(resultGet).toHaveProperty('make', 'teste')
    expect(resultGet).toHaveProperty('model', 'gol')
    expect(resultGet).toHaveProperty('yearOfManufacture', '2015')
    expect(resultGet).toHaveProperty('yearOfModel', '2005')
    expect(resultGet).toHaveProperty('licensePlate', 'ays1012')
    expect(resultGet).toHaveProperty('color', 'branco')
    expect(resultGet).toHaveProperty('chassisNumber', '9BWSU19FD8B302158')
    expect(resultGet).toHaveProperty('renavam', '00891353362')
    expect(resultGet).toHaveProperty('fuelType', 'gasolina')
    expect(resultGet).toHaveProperty('tankCapacity', 50)
    expect(resultGet).toHaveProperty('mileage', 2)
    expect(resultGet).toHaveProperty('lastMaintenanceDate')
    expect(resultGet).toHaveProperty('nextMaintenanceDate')
    expect(resultGet).toHaveProperty('status', 2)
    expect(resultGet).toHaveProperty('purchaseValue', 2)
    expect(resultGet).toHaveProperty('purchaseDate', 2)
    expect(resultGet).toHaveProperty('purchaseSupplier', 2)
    expect(resultGet).toHaveProperty('notes', 'teste')

    const object2 = {
      make: 'teste',
      model: 'kwid',
      yearOfManufacture: '2018',
      yearOfModel: '2010',
      licensePlate: 'ays2015',
      color: 'preto',
      chassisNumber: '9BWSU19FD8B307892',
      renavam: '00891353123',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }

    result = await dbo.update(object2, 1, tableName)
    expect(result.errors)
  })

  test('INSERT + SEARCH PADRÃO INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      make: 'teste',
      model: 'gol',
      yearOfManufacture: '2015',
      yearOfModel: '2005',
      licensePlate: 'ays1012',
      color: 'branco',
      chassisNumber: '9BWSU19FD8B302158',
      renavam: '00891353362',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'Aleatorio', signal: '=', value: 'Aleatorio' }]
    result = await dbo.search(tableName, params)

    expect(result).toBe(false)
  })

  test('INSERT + SEARCH AND INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      make: 'teste',
      model: 'gol',
      yearOfManufacture: '2015',
      yearOfModel: '2005',
      licensePlate: 'ays1012',
      color: 'branco',
      chassisNumber: '9BWSU19FD8B302158',
      renavam: '00891353362',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'Aleatorio', signal: '=', value: 'Aleatorio', operator: 'AND' }]
    result = await dbo.search(tableName, params)

    expect(result).toBe(false)
  })

  test('INSERT + SEARCH OR INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      make: 'teste',
      model: 'gol',
      yearOfManufacture: '2015',
      yearOfModel: '2005',
      licensePlate: 'ays1012',
      color: 'branco',
      chassisNumber: '9BWSU19FD8B302158',
      renavam: '00891353362',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object, tableName)

    const params = [{ column: 'Aleatorio', signal: '=', value: 'Aleatorio', operator: 'OR' }]
    result = await dbo.search(tableName, params)

    expect(result).toBe(false)
  })

  test('INSERT + SEARCH LIKE', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object = {
      make: 'teste',
      model: 'gol',
      yearOfManufacture: '2015',
      yearOfModel: '2005',
      licensePlate: 'ays1012',
      color: 'branco',
      chassisNumber: '9BWSU19FD8B302158',
      renavam: '00891353362',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object, tableName)

    const params = [
      {
        column: 'Aleatorio',
        signal: '=',
        value: 'Aleatorio',
        operator: 'LIKE',
      },
    ]
    result = await dbo.search(tableName, params)

    expect(result).toBe(false)
  })

  test('2 INSERT + SEARCH IN INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      make: 'teste',
      model: 'gol',
      yearOfManufacture: '2015',
      yearOfModel: '2005',
      licensePlate: 'ays1012',
      color: 'branco',
      chassisNumber: '9BWSU19FD8B302158',
      renavam: '00891353362',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object1, tableName)

    const object2 = {
      make: 'teste',
      model: 'kwid',
      yearOfManufacture: '2018',
      yearOfModel: '2010',
      licensePlate: 'ays2015',
      color: 'preto',
      chassisNumber: '9BWSU19FD8B307892',
      renavam: '00891353123',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object2, tableName)

    const params = [
      {
        column: 'Aleatorio',
        signal: '=',
        value: ['Aleatorio', 'Aleatorio'],
        operator: 'IN',
      },
    ]

    result = await dbo.search(tableName, params)

    expect(result).toBe(false)
  })

  test('INSERT + DELETE INCORRETO', async () => {
    await request(app).post('/login').send({
      email: 'teste@email.com',
      password: '123',
    })

    const object1 = {
      make: 'teste',
      model: 'gol',
      yearOfManufacture: '2015',
      yearOfModel: '2005',
      licensePlate: 'ays1012',
      color: 'branco',
      chassisNumber: '9BWSU19FD8B302158',
      renavam: '00891353362',
      fuelType: 'gasolina',
      tankCapacity: 50,
      mileage: 2,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDate: new Date(),
      status: 2,
      purchaseValue: 2,
      purchaseDate: 2,
      purchaseSupplier: 2,
      notes: 'teste',
    }
    await dbo.insert(object1, tableName)

    result = await dbo.remove(3, tableName)

    expect(result).toBe(0)
  })
})
