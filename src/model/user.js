const Joi = require("joi")

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/

const object = Joi.object().keys({
  name: Joi.string().required().label("Nome"),
  email: Joi.string().required().label("E-mail"),
  phone: Joi.string().label("Telefone").required(),
  company: Joi.string().label("Empresa").required(),
  position: Joi.string().label("Cargo").required(),
  gender: Joi.string().valid('M', 'F').required().label("Gênero"), // Novo campo com validação
  password: Joi.string().regex(passwordRegex, "password").label("Senha"),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  status: Joi.number().label("Status"),
  nfcActivated: Joi.boolean().default(false).label("Cartão NFC ativado")
  
  // confirmPassword: "",
  
})

module.exports = { object }