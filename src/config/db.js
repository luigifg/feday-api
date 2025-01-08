const knex = require('knex')
const knexStringcase = require('knex-stringcase')

const config = require('./knexfile')
const options = knexStringcase(config)
const db = knex(options)

module.exports = db
