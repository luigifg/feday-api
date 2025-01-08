const Joi = require("joi")

const object = Joi.object().keys({
  idUser: Joi.number().required().label("Id do usuario"),
  idGroup: Joi.number().required().label("Id do grupo"),
})

module.exports = { object }
