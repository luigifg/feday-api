exports.up = function (knex) {
  return knex.schema.createTable('processor', function (table) {
    table.increments('id').primary()
    table.string('operation')
    table.integer('priority')
    table.integer('status')
    table.integer('id_user').unsigned()
    table.foreign('id_user').references('user.id')
    table.text('body_request')
    table.text('observation')

    table.timestamps(true, true)
    table.datetime('deleted_at').defaultTo(null)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('processor')
}
