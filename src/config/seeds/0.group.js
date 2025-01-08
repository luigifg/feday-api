exports.seed = async function (knex) {
  await knex('group').insert([
    {
      name: 'Padrão'
    },
    {
      name: 'Admin'
    }
  ])
}
