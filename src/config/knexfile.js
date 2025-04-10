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
    min: 100,          // Começar com um bom número de conexões prontas
    max: 300,         // Suporte para picos de até 100 conexões simultâneas
    acquireTimeoutMillis: 60000,  // 1 minuto para timeout de aquisição
    createTimeoutMillis: 30000,   // 30 segundos para timeout de criação
    idleTimeoutMillis: 120000,    // 2 minutos antes de fechar conexões ociosas
    reapIntervalMillis: 20000,    // Verificar conexões inativas a cada 20 segundos
    createRetryIntervalMillis: 200 // Intervalo entre tentativas de criação
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
