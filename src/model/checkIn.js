const Joi = require("joi")

const object = Joi.object().keys({
  userId: Joi.number().required().label("ID do usuário"),
  hour: Joi.number().required().label("ID do horário"),
  eventId: Joi.number().required().label("ID da palestra"),
  adminId: Joi.number().required().label("ID do admin"),
})

module.exports = { object }
