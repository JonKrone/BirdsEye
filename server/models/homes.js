const Help = require('../server-helper');

const db = require(__lib + 'db/connection');
const Homes = module.exports;



// TODO: deleteById



/*
	Create a home!

	Address is not a suitable key to reference specific homes.
	Not sure what the better solution is at the moment.

	@param home: {
		address <String>
		sqft <Number>
		stories <Number>
		bath_count <Number>
		bedroom_count <Number>
		heater_type <String>
		heater_install_date <Date>
		ac_type <String>
		ac_install_date <Date>
	}

	@return: {
		home_id: serial primary key
	}
*/
Homes.create = function(home) {
	// validation should take place here

	return db('homes')
		.returning(['home_id'])
		.insert(home)
		.then(Help.first)
		.catch(Help.reportError('Creating home'));
}

// Fetch the home associated with @param _home_id
Homes.findById = function(_home_id) {
	const values = ['home_id', 'address', 'sqft', 'stories',
		'bath_count', 'bedroom_count', 'heater_type',
		'heater_install_date', 'ac_type', 'ac_install_date'];

	return db('homes')
		.returning(values)
		.where({ home_id: _home_id })
		.then(Help.first)
		.catch(Help.reportError('finding a home by id'));
}

// Update a home entry, selected and searched by @ param _home_id.
Homes.updateById = function(_home_id, newHome) {
	return db('homes')
		.where({ home_id: _home_id })
		.update(newHome)
		.catch(Help.reportError('updating a home by id'));
}

Homes.deleteById = function(_home_id) {
	return db('homes')
		.where({ home_id: _home_id })
		.del()
		.catch(Help.reportError('deleteing a home by id'));
}

// Fetch the homes associated with @param _customer_id
Homes.ofCustomerId = function(_customer_id) {
	return db('customers_homes')
		.where({ customer_id: _customer_id })
		.select('home_id')
		.map(Homes.findById)
		.catch(Help.reportError('retrieving homes by customer id'))
}
