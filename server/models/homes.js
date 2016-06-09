const Help = require('../server-helper');

const db = require(__lib + 'db/connection');
const Customers = require('./customers');
const Homes = module.exports;

/*
	Creates a home entry.

	@param home: {
		address <String>
		sqft <Number>
		stories <Number>
		bath_count <Number>
		bedroom_count <Number>
		heater_type <String>
		heater_install_date <Date>
		AC_type <String>
		AC_install_date <Date>
	}
*/
Homes.create = function(home) {
	// validation should take place here

	return db('homes')
		.insert(home)
		.then(Help.first)
		.catch(Help.reportError('Creating home'));
}

// Fetch the home associated with @param home_id
Homes.ofId = function(home_id) {
	return db('homes')
		.where({ home_id: home_id })
		.then(Help.first)
		.catch(Help.reportError('finding a home by its id'));
}

// Fetch the homes associated with @param customer_id
Homes.ofCustomerId = function(customer_id) {
	return db('customers_homes')
		.where({ customer_id: customer_id })
		.select('home_id')
		.map(Homes.byId)
		.catch(Help.reportError('retrieving homes by customer id'))
}