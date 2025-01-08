exports.seed = async function (knex) {
  await knex('user').insert([
    {
      name: 'Admin',
      email: 'admin@email.com',
      company: 'Future Electronics',
      position: 'Intern leader',
      phone: '41988116797',
      password: '$2b$10$3qWOYbAMTaDodeXgl2UWVu5GC11i/0j7BCwD0gWixwMeNWZFdzFdW'
    },
    {
      name: 'UserIA',
      email: 'ia@email.com',
      password: '$2b$10$3qWOYbAMTaDodeXgl2UWVu5GC11i/0j7BCwD0gWixwMeNWZFdzFdW'
    },
    {
      name: 'Teste',
      email: 'teste@email.com',
      password: '$2b$10$3qWOYbAMTaDodeXgl2UWVu5GC11i/0j7BCwD0gWixwMeNWZFdzFdW'
    }
  ])
}
