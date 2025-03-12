const Joi = require("joi")

const object = Joi.object().keys({
  userId: Joi.number().required().label("ID do usuário"),
  userName: Joi.string().required().label("Nome do usuário"),
  scheduleId: Joi.number().required().label("ID do horário"),
  eventId: Joi.number().required().label("ID da palestra"),
  title: Joi.string().required().label("Título palestra"),
  speaker: Joi.string().required().label("Nome palestrante"),
  room: Joi.string().required().label("Sala"),
})

module.exports = { object }
