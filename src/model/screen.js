const Joi = require("joi")

const object = Joi.object().keys({
  name: Joi.string().required().label("Nome"),
  route: Joi.string().required().label("Rota"),
  order: Joi.number().required().label("Ordem"),
})

module.exports = { object }
