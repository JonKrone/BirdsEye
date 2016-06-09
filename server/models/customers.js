const Help = require('../server-helper');

const db = require(__lib + 'db/connection');
const Customers = module.exports;

/*
	Creates a customer entry.

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
		.returning(['email', 'name', 'phone', 'aspirations'])
		.insert(customer)
		.then(Help.first)
		.catch(Help.reportError('Creating customer'));
}

/*
	Removes the customer accounts (hopefully only one)
	associated with @param email <String>
*/
Customers.deleteByEmail = function(email) {
	const userId = findByEmail(email)

	return findByEmail(email)
		// .then(check that an email was found. Might be a helpful piece of information.)
		.then(function(customer) {
			return db('customers')
				.where({ customer_id: customer.customer_id })
				.del();
		})
		.catch(Help.reportError('Deleting customer by email'))
}

/*
	Private utility to find customer by @param email <String>
*/
function findByEmail(email) {
	return db('customers')
		.where({ email: email })
		.then(Help.first)
		.catch(Help.reportError('Finding customer by email'));
}