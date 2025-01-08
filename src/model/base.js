const Joi = require('joi')
const error = require('../config/error-message')

const object = Joi.object().keys({})

module.exports = { object }
