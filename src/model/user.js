const Joi = require("joi")

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/

const object = Joi.object().keys({
  /////////////Depois colocar informações de celular, empresa, cargo
  name: Joi.string().required().label("Nome"),
  email: Joi.string().required().label("E-mail"),
  phone: Joi.string().label("Telefone"),
  company: Joi.string().label("Empresa"),
  position: Joi.string().label("Cargo"),
  password: Joi.string().regex(passwordRegex, "password").label("Senha"),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  status: Joi.number().label("Status"),

  // confirmPassword: "",
  
})

module.exports = { object }
