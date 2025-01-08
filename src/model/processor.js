const Joi = require("joi")

const object = Joi.object().keys({
  operation: Joi.string().required().label("Operação"),
  priority: Joi.number().required().label("Prioridade"),
  status: Joi.number().required().label("Status"),
  idUser: Joi.number().required().label("ID do Usuario"),
  bodyRequest: Joi.object().required().label("Corpo da Requisição"),
  observation: Joi.string().allow("", null).label("Observação"),
})

module.exports = { object }
