exports.up = function (knex) {
  return knex.schema.createTable('user', function (table) {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('email').unique().notNullable()
    table.string('phone').notNullable()
    table.string('company').notNullable()
    table.string('position').notNullable()
    table.string('gender', 1).notNullable() // Novo campo de gênero como CHAR(1)
    table.string('password').notNullable()
    table.boolean('status').defaultTo(true)
    table.boolean('nfc_activated').default(false)
    table.timestamps(true, true)
    table.datetime('deleted_at').defaultTo(null)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user')
}