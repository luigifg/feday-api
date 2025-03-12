exports.up = function (knex) {
    return knex.schema.createTable('check_in', function (table) {
      table.increments('id').primary()
      table.integer('user_id').unsigned().notNullable()
      table.string('user_name').notNullable()
      table.integer('hour').unsigned().notNullable()
      table.integer('event_id').unsigned().notNullable()
      table.integer('admin_id').unsigned().notNullable()
      table.timestamps(true, true)
      table.datetime('deleted_at').defaultTo(null)
    })
  }
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('check_in')
  }
  