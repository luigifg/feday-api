const Joi = require('joi')

const object = Joi.object().keys({
  idUser: Joi.number().required().label('ID do usuario'),
  idScreen: Joi.number().required().label('ID da tela'),
  status: Joi.number().label('Status')
})

module.exports = { object }
