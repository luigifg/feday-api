exports.seed = async function (knex) {
  await knex('user_group').insert([
    {
      id_user: 1,
      id_group: 2
    },
    {
      id_user: 2,
      id_group: 2
    },
    {
      id_user: 3,
      id_group: 2
    }
  ])
}
