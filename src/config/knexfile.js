const path = require('path')

module.exports = {
  client: 'mysql2',
  connection: {
    database: process.env.DBNAME,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    host: process.env.DBHOST,
    
  },
  pool: {
    min: 2,
    max: 10,
    acquireTimeoutMillis: 10000
    
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve(__dirname,'./migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname,'./seeds'),
  },
}

// Update with your config settings.
// const path = require('path');

// module.exports = {
//   client: 'mysql',
//   connection: {
//     database: 'railway',
//     user: 'root',
//     password: 'xslOhpaTboJacAVNSjqRPPvfBTSrqTek',
//     host: 'mysql.railway.internal',
//   },
//   pool: {
//     min: 2,
//     max: 10,
//     acquireTimeoutMillis: 10000,
//   },
//   migrations: {
//     tableName: 'knex_migrations',
//     directory: path.resolve(__dirname, './migrations'),
//   },
//   seeds: {
//     directory: path.resolve(__dirname, './seeds'),
//   },
// };
