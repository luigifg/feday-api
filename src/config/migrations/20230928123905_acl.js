exports.up = function (knex) {
  return knex.schema.createTable('acl', function (table) {
    table.increments('id').primary()
    table.integer('id_group').unsigned().notNullable()
    table.foreign('id_group').references('group.id')
    table.integer('id_screen').unsigned().notNullable()
    table.foreign('id_screen').references('screen.id')
    table.boolean('status').defaultTo(true)

    table.timestamps(true, true)
    table.datetime('deleted_at').defaultTo(null)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('acl')
}
