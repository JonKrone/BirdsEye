const Help = require('../server-helper');
const Customers = require(__models + '/customers');

const CustomersAPI = require('express').Router();
const homesAPI = require('./homes-api');

module.exports = CustomersAPI;

/*
	Create a new customer.

	@param req.body: {
		customer: {
			name: <String>,
			email: <String>,
			phone: <String>,
		}
	}

	@return via response {
		customer_id: <Number>,
		email: <String>,
		name: <String>,
		phone: <String>,
		notes: <String[]>,
	}
	OR
	{ error: <String> }
*/
CustomersAPI.post('/', function(req, res) {
	Customers.create(req.body.customer)
		.then(Help.sendStatusAndData(res, 200))
		.catch(Help.sendStatusAndError(res, 500, 'Server error creating customer'));
});

/*
	Fetch a list of all customers

	@return via response: [
		{
			customer_id: <Number>,
			name: <String>,
			email: <String>,
			phone: <String>,
			notes: <String>,
		},
		...
	]
	OR
	{ error: <String> }
*/
CustomersAPI.get('/', function(req, res) {
	Customers.all()
		.then(Help.sendStatusAndData(res, 200))
		.catch(Help.sendStatusAndError(res, 500, 'Server error fetching all customers'));
});

/*
	Find a customer profile by customer_id.

	@param req.params.customer_id: <Number>

	@return via response: { 
		customer_id <Number>,
		email <String>,
		name <String>,
		phone <String>,
		notes <String[]>,
	}
	OR
	{ error <String> }

	// I have an unfounded preference for passing information in the body rather than
	// URL params. Params are used in this case to more easily differentiate from a GET to '/'
	// for all customers. A difference may be: passing via params indicates manipulation to
	// a specific instance of the struct represented at the endpoint. 
*/
CustomersAPI.get('/:customer_id', function (req, res) {
  Customers.findById(req.params.customer_id)
    .then(Help.sendStatusAndData(res, 200))
    .catch(Help.sendStatusAndError(res, 500, 'Server error getting a customer'));
});

/*
	Fetch a list of homes associated with @param customer_id.

	@return via response: [
		{
			home_id: <Number>,
			address: <String>,
			sqft: <Number>,
			stories: <Number>,
			bath_count: <Number>,
			bedroom_count: <Number>,
			heater_type: <String>,
			heater_install_date: <String>,
			ac_type: <Number>,
			ac_install_date: <String>,
		},
		...
	]
	OR
	{ error: <String> }
*/
CustomersAPI.get('/:customer_id/homes', funciton(req, res) {
	Homes.ofCustomerId(req.params.customer_id)
		.then(Help.sendStatusAndData(res, 200))
		.catch(Help.sendStatusAndError(res, 500, 'Server error getting all homes of customer'))
})

/*
	NOT IMPLEMENTED IN MODEL

	Create a note for a customer.
	TODO: Could be useful to track information about who wrote the note and
	when it was written
	
	@param req.body: {
		customer_id: <Number>,
		note: <String>,
	}

	@return via response: status 200 or 500 with { error: <String> }
*/
CustomersAPI.post('/note', function(req, res) {
	const customer_id = req.body.customer_id;
	const note = req.body.note;

	Customers.createNote(customer_id, note)
		.then(Help.sendStatus(res, 200))
		.catch(Help.sendStatusAndError(res, 500, 'Server error creating note'));
});

/*
	Update a customer entry. For posterity, do not update notes.

	@param req.params.customer_id: <number>
	@param req.body: {
		customer: {
			name: <String>,
			email: <String>,
			phone: <String>,
		}
	}

	@return via response {
			customer_id: <String>,
			name: <String>,
			email: <String>,
			phone: <String>,
	}
	OR
	{ error: <String> }
*/
CustomersAPI.put('/:customer_id', function(req, res) {
	const customer_id = req.params.customer_id;
	const customer = req.body.customer;

	// More of a thought than a concern. Don't want to/probably can't update a primary key.
	if ('customer_id' in customer) delete customer['customer_id'];

	Customers.updateById(customer_id, customer)
		.then(Help.sendStatus(res, 200))
		.catch(Help.sendStatusAndError(res, 500, 'Server error updating customer'));
})
