/*
  Database configuration for our implementation of Knex.
  
  Knex is a "batteries included" SQL query building and database interface.
*/

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'development',
    },
    // seeds: {
    //   directory: './lib/seeders',
    // },
    debug: true, // verbose database operations
  },
  test: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'test',
    },
    debug: false, // verbose database operations
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
  },
};