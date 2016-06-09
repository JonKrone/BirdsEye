const helper = require('../server-helper');

const db = require(__lib + 'db/connection');
const Customers = module.exports;

/*
	Creates a customer entry in the database.

	@param customer: {
		name <String, required>
		email <String, required>
		phone <String>
	}
*/
Customers.create = function(customer) {
	// augment @param customer if need be

	return db('customers').insert(customer)
		.then(helper.first);
		.catch(helper.reportError)
}

/*
	Removes the customer accounts (hopefully only one)
	associated with @param email <String>
*/
Customers.deleteByEmail = function (email) {
	const userId = findByEmail(email)

	return findByEmail(email)
		// .then(check that an email was found. Might be a helpful piece of information.)
		.then(function(customer) {
			return db('customers').where({ customer_id: customer.customer_id })
				.del();
		})
		.catch(helper.reportError('Deleting customer by email'))
}

/*
	Find customer by @param email <String>
*/
function findByEmail(email) {
	return db('customers').where({ email: email })
		.then(first);
		.catch(helper.reportError('Finding customer by email'))
}