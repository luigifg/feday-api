const Joi = require("joi")

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/

const object = Joi.object().keys({
  name: Joi.string().required().label("Nome"),
  description: Joi.string().label("Descrição"),
  category: Joi.string().label("Categoria"),
  price: Joi.number().label("Preço"),
  image: Joi.string().label("Imagem"),

})

module.exports = { object }