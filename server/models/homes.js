const Help = require('../server-helper');

const db = require(__lib + 'db/connection');
const Customers = require('./customers');
const Homes = module.exports;

/*
	Create a home!

	// TODO: What is the unique, unchangeable reference for a home?

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

/*
	Update a home entry, selected and searched by @ param _address.
	Address is not a suitable key to reference specific homes.
	Not sure what the better solution is at the moment.
*/
Homes.updateByAddress = function(_address, newHome) {
	return db('homes')
		.where({ address: _address })
		.update(newHome);
}

// Fetch the homes associated with @param _customer_id
Homes.ofCustomerId = function(_customer_id) {
	return db('customers_homes')
		.where({ customer_id: _customer_id })
		.select('home_id')
		.map(byId)
		.catch(Help.reportError('retrieving homes by customer id'))
}

// Private utility to fetch the home associated with @param _home_id
function ofId(_home_id) {
	return db('homes')
		.where({ home_id: _home_id })
		.then(Help.first)
		.catch(Help.reportError('finding a home by its id'));
}