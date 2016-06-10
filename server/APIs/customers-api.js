const Help = require('../server-helper');
const Customers = require(__models + '/message');

const CustomersAPI = require('express').Router();

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
		.then(sendStatusAndData(res, 200))
		.catch(sendStatusAndError(res, 500, 'Server error creating customer'));
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
*/
CustomersAPI.get('/', function(req, res) {
	Customers.all()
		.then(sendStatusAndData(res, 200))
		.catch(sendStatusAndError(res, 500, 'Server error fetching all customers'));
})


/*
	Find a customer profile by customer_id.

	@param req.params: {
		customer_id: <Number>,
	}

	@return via response: { 
		customer_id <Number>,
		email <String>,
		name <String>,
		phone <String>,
		notes <String[]>,
	}
	OR
	{ error <String> }
*/
CustomersAPI.get('/:customer_id', function (req, res) {
  Customers.findById(req.params.customer_id)
    .then(sendStatusAndData(res, 200))
    .catch(sendStatusAndError(res, 500, 'Server error getting all messages'));
});

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
		.then(sendStatus(res, 200))
		.catch(sendStatusAndError(res, 500, 'Server error creating note'));
});

/*
	NOT IMPLEMENTED IN MODEL

	Update a customer entry. Do not update notes.

	@param req.body: {
		customer_id: <Number>,
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
CustomersAPI.put('/', function(req, res) {
	const customer_id = req.body.customer_id;
	const customer = req.body.customer;

	// More of a thought than a concern. Don't want to/probably can't update a primary key.
	if ('customer_id' in customer) delete customer['customer_id'];

	Customers.updateById(customer_id, customer)
		.then(sendStatusAndData(res, 200))
		.catch(sendStatusAndError(res, 500, 'Server error updating customer'));
})
