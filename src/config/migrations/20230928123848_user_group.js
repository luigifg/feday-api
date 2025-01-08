exports.up = function (knex) {
  return knex.schema.createTable('user_group', function (table) {
    table.increments('id').primary()
    table.integer('id_user').unsigned().notNullable()
    table.foreign('id_user').references('user.id')
    table.integer('id_group').unsigned().notNullable()
    table.foreign('id_group').references('group.id')

    table.timestamps(true, true)
    table.datetime('deleted_at').defaultTo(null)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user_group')
}
