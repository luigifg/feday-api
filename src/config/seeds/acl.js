exports.seed = async function (knex) {
  await knex('acl').insert([
    {
      id_group: 1,
      id_screen: 1
    },
    {
      id_group: 1,
      id_screen: 2
    },
    {
      id_group: 1,
      id_screen: 3
    },
    {
      id_group: 1,
      id_screen: 4
    },
    {
      id_group: 1,
      id_screen: 5
    },
    {
      id_group: 1,
      id_screen: 6
    },
    {
      id_group: 1,
      id_screen: 7
    },
    {
      id_group: 1,
      id_screen: 8
    },
    {
      id_group: 1,
      id_screen: 9
    },
    ///////////////////////////////////////
    {
      id_group: 2,
      id_screen: 1
    },
    {
      id_group: 2,
      id_screen: 2
    },
    {
      id_group: 2,
      id_screen: 3
    },
    {
      id_group: 2,
      id_screen: 4
    },
    {
      id_group: 2,
      id_screen: 5
    },
    {
      id_group: 2,
      id_screen: 6
    },
    {
      id_group: 2,
      id_screen: 7
    },
    {
      id_group: 2,
      id_screen: 8
    },
    {
      id_group: 2,
      id_screen: 9
    },
    {
      id_group: 2,
      id_screen: 10
    },

  ])
}
