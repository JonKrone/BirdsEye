const Help = require('../server-helper');

const db = require(__lib + 'db/connection');
const Customers = module.exports;


// TODO: update, findById



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
		.returning(['email', 'name', 'phone', 'notes'])
		.insert(customer)
		.then(Help.first)
		.catch(Help.reportError('Creating customer'));
}

/*
	Remove the customer account (hopefully only one) associated with @param email <String>

	This also removes associations with any homes (but does not delete the home).
*/
Customers.deleteByEmail = function(email) {
	return findByEmail(email)
		// .then(check that an email was found. Might be a helpful piece of information.)
		.then(function(customer) {
			return db('customers')
				.where({ customer_id: customer.customer_id })
				.del()
				.catch(Help.reportError('Deleting customer by email'))
				.then(function(numDeleted) {
					return deleteCustomersHomesById(customer.customer_id)
						.then(() => numDeleted);
				})
		})
}

// Find customer by @param email
function findByEmail(_email) {
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
		.catch(Help.reportError('deleting customer from customers homes'));
}