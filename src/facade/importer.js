const dbo = require('../dbo/importer')
const XLSX = require('xlsx')
const model = require('../model/importer')

const excelToJson = require('convert-excel-to-json')
const fs = require('fs')
const path = require('path')
const { error } = require('console')

const readFile = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const insertTxt = async file => {
  const data = await readFile(file.path)
  const rows = data.split('\n')

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const values = row.split(';')
    const os = {
      protocolo: values[1],
      idLocale: values[2],
      idDistrict: values[4],
      idTeam: values[5],
      idServiceRequested: values[10],
      performedDate: values[12],
      idServicePerformed: values[13],
      observation: values[16],
      address: values[21],
      addressNro: values[22],
      quantity: 0
    }

    if (os.observation) {
      const observation = os.observation.trim()
      const regex = /(\d+(?:[.,]\d+)?[xX]\d+(?:[.,]\d+)?[xX]\d+(?:[.,]\d+)?)/
      const matches = observation.match(regex)

      if (matches && matches.length > 0) {
        const dimensions = matches[0]
        const quantity = calculateQuantity(dimensions)
        os.quantity = quantity
      }
    }

    // Validate OS
    let isValidOs = true
    Object.keys(os).forEach(key => {
      if (os[key] === undefined) {
        isValidOs = false
      }
    })

    if (isValidOs) {
      await dbo.insertTxt(os)
    } else {
    }
  }
  return
}

const calculateQuantity = dimensions => {
  const dimensionParts = dimensions.split(/[xX]/)
  let quantity = 1

  for (const part of dimensionParts) {
    const dimensionValue = parseFloat(part.replace(',', '.'))
    quantity *= dimensionValue
  }

  quantity = quantity //.toFixed(2)

  return quantity
}

const insertXlsx = async object => {
  const workbook = XLSX.readFile(object.path)
  const sheetName = workbook.SheetNames[0]

  const sheet = workbook.Sheets[sheetName]
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 })

  for (const row of data) {
    const values = row.map(cell => cell.toString())
    const osMedicao = {
      idLocale: values[0],
      idLocaleInvoicing: values[2],
      idResource: values[4],
      idConstructUnity: values[5],
      performedDate: values[6],
      protocolo: values[7],
      idDistrict: values[8],
      idServiceRequested: values[9],
      idServicePerformed: values[10],
      idTeam: values[11],
      idMos: values[12],
      quantity1: values[13],
      quantity2: values[14],
      quantity3: values[15],
      price: values[16],
      quantity: values[17],
      value: values[18]
    }
    await dbo.insertXlsx(osMedicao)
  }

  // Glosa
  const sheetName2 = workbook.SheetNames[1]
  const sheet2 = workbook.Sheets[sheetName2]
  const data2 = XLSX.utils.sheet_to_json(sheet2, { header: 1 })
  for (const row of data2) {
    const values = row.map(cell => cell.toString()) // convert cells to strings
    const glosa = {
      idLocale: values[0],
      idLocaleInvoicing: values[2],
      idResource: values[4],
      idConstructUnity: values[5],
      performedDate: values[6],
      protocolo: values[7],
      idDistrict: values[8],
      idServiceRequested: values[9],
      idServicePerformed: values[10],
      idTeam: values[11],
      observation: values[12]
    }
    await dbo.insertGlosa(glosa)
  }
}

const insertOsMedicao = async (object, referralDate) => {
  const workbook = XLSX.readFile(object.path)
  const sheetName = workbook.SheetNames[0]
  const sheetName2 = workbook.SheetNames[1]
  const sheet = workbook.Sheets[sheetName]
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 })

  if (sheetName !== 'Medição' || sheetName2 !== 'Glosas') {
    throw new Error('Arquivo não está no padrão com as abas (Medição, Glosas)')
  }

  const expectedHeaders = [
    
    'Código localidade execução',
    'Localidade execução',
    'Código localidade faturamento',
    'Localidade faturamento',
    'Recurso',
    'Unidade construtiva',
    'Data de execução',
    'Protocolo',
    'Distrito',
    'Solicitado',
    'Executado',
    'Equipe',
    'MOS',
    'Qtde1',
    'Qtde2',
    'Qtde3',
    'Preco',
    'Quantidade',
    'Valor',
    'Data relatório'
  ]

  if (JSON.stringify(data[0]) !== JSON.stringify(expectedHeaders)) {
    throw new Error('A primeira linha do arquivo não está no padrão')
  }

  const osMedicaoArray = []

  const existingRecords = new Set()

  for (let i = 0; i < data.length; i++) {
    if (i === 0) continue
    const row = data[i]
    const values = row.map(cell => cell.toString())
    const osMedicao = {
      id_locale: values[0],
      id_locale_invoicing: values[2],
      id_resource: values[4],
      id_construct_unity: values[5],
      performed_date: new Date(values[6]),
      protocolo: values[7],
      id_district: values[8],
      id_service_requested: values[9],
      id_service_performed: values[10],
      id_team: values[11],
      id_mos: values[12],
      quantity1: values[13],
      quantity2: values[14],
      quantity3: values[15],
      price: values[16],
      quantity: values[17],
      value: values[18],
      referral_date: referralDate
    }
    const key = JSON.stringify(osMedicao)

    if (!existingRecords.has(key)) {
      osMedicaoArray.push(osMedicao)
      existingRecords.add(key)
    }
  }

  await dbo.insertOsMedicao(osMedicaoArray, 'osMedicao')

  // Glosa

  const sheet2 = workbook.Sheets[sheetName2]
  const data2 = XLSX.utils.sheet_to_json(sheet2, { header: 1 })
  for (const row of data2) {
    const values = row.map(cell => cell.toString())
    const glosa = {
      idLocale: values[0],
      idLocaleInvoicing: values[2],
      idResource: values[4],
      idConstructUnity: values[5],
      performedDate: new Date(values[6]),
      protocolo: values[7],
      idDistrict: values[8],
      idServiceRequested: values[9],
      idServicePerformed: values[10],
      idTeam: values[11],
      observation: values[12]
    }
    await dbo.insertGlosa(glosa)
  }
  return true
}

module.exports = {
  insertTxt,
  insertXlsx,
  insertOsMedicao
}
