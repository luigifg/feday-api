exports.seed = async function (knex) {
  await knex('screen').insert([
    {
      name: 'Login',
      route: '/login',
    },
    {
      name: 'Home',
      route: '/',
    },
    {
      name: 'Grupos',
      route: '/group',
    },
    {
      name: 'Programas',
      route: '/acl',
    },
    {
      name: 'Usuarios',
      route: '/user',
    },
    {
      name: 'Me',
      route: '/me',
    },
    {
      name: 'Telas',
      route: '/screen',
    },
    {
      name: 'Grupos dos usuarios',
      route: '/userGroup',
    },
    {
      name: 'Participação',
      route: '/participation',
    },
    {
      name: 'Chek-in',
      route: '/checkIn',
    },
  ])
}
