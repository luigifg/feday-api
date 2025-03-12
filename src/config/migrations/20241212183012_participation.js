exports.up = function (knex) {
    return knex.schema.createTable('participation', function (table) {
      table.increments('id').primary()
      table.integer('user_id').unsigned().notNullable()
      table.string('user_name').notNullable()
      table.integer('schedule_id').unsigned().notNullable()
      table.integer('event_id').unsigned().notNullable()
      table.string('title').notNullable()
      table.string('speaker').notNullable()
      table.string('room').notNullable()
      table.timestamps(true, true)
      table.datetime('deleted_at').defaultTo(null)
    })
  }
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('participation')
  }
  