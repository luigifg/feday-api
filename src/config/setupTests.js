require('dotenv').config({ path: '.env.test' })
const knex = require('./db')
module.exports = {
  "maxWorkers": 4,
  "cache": true 
}

beforeEach(async () => {
  await knex.migrate.rollback()
  await knex.migrate.latest()
  await knex.seed.run()
})


afterEach(async () => {
  await knex.migrate.rollback()
})
