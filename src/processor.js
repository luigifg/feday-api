const facade = require("./facade/processor")
const facadeImport = require("./facade/importer")

const start = async () => {
  const pendingImports = await facade.getPending()

  if (!pendingImports) {
    return false
  }

  return await executeImport(
    pendingImports.id,
    pendingImports.operation,
    pendingImports.bodyRequest
  )
}

const executeImport = async (id, operation, file) => {
  try {
    await updateStatus(id, 1)
    const jsonObject = JSON.parse(file)
    if (operation === "insertOsMedicao") {
      const result = await facadeImport.insertOsMedicao(
        jsonObject,
        jsonObject.referralDate
      )
      await updateStatus(id, 2)
      return result
    }

    const result = await facadeImport[operation](jsonObject)

    await updateStatus(id, 2)
    return result
  } catch (error) {
    await updateStatus(id, 3, error.message)
    return false
  }
}

const updateStatus = async (id, status, observation = "") => {
  const object = {
    status: status,
    observation: observation,
  }

  return await facade.update(object, id)
}

module.exports = {
  start,
  updateStatus,
}

/*
STATUS
0 - pendente 
1 - processando
2 - concluido
3 - erro
*/
