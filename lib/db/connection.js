/*
	Instantiate and export our database connection.
*/

const config = require('../../knexfile');
const env    = process.env.NODE_ENV || 'development';
const knex   = require('knex')(config[env]);

module.exports = knex;