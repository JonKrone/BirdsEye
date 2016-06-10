const Help = require('../server-helper');

const db = require(__lib + 'db/connection');
const Customers = module.exports;


// TODO: updateById (explicitly prevent updates to notes?), findById, fetchAll



/*
	Create a customer entry.

	@param customer: {
		name <String, required>
		email <String, required>
		phone <String>
	}
*/
Customers.create = function(customer) {
	// augment @param customer if need be
	// validation should take place here

	return db('customers')
		.returning(['customer_id', 'email', 'name', 'phone', 'notes'])
		.insert(customer)
		.then(Help.first)
		.catch(Help.reportError('Creating customer'));
}

// Fetch a list of all customers.
Customers.all = function() {
	return db('customers')
		.select('*')
		.catch(Help.reportError('Fetching all customers'));
}

/*
	Remove the customer account (hopefully only one) associated with @param email <String>

	This also removes associations with any homes (but does not delete the home).
*/
Customers.deleteById = function(_customer_id) {
	return db('customers')
		.where({ customer_id: _customer_id })
		.del()
		.catch(Help.reportError('Deleting customer by email'))
		.then(function(numDeleted) {
			return deleteCustomersHomesById(_customer_id)
				.then(() => numDeleted);
		})
}

// Update a customer associated with @param _customer_id
Customers.updateById = function(_customer_id, updates) {
	return db('customers')
		.where({ customer_id: _home_id })
		.update(updates)
		.catch(Help.reportError('updating a customer by id'));
}

// Find customer by @param email
Customers.findByEmail = function(_email) {
	return db('customers')
		.where({ email: _email })
		.then(Help.first)
		.catch(Help.reportError('Finding customer by email'));
}

// Delete entries with @param _customer_id from table customers_homes
function deleteCustomersHomesById(_customer_id) {
	return db('customers_homes')
		.where({ customer_id: _customer_id })
		.del()
		.catch(Help.reportError('Deleting customer from customers homes'));
}