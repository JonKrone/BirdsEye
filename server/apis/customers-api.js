const Help = require('../server-helper');
const Customers = require(__models + '/customers');
const Homes = require(__models + '/homes');
const Notes = require(__models + '/notes');

const CustomersAPI = require('express').Router();
const homesAPI = require('./homes-api');

module.exports = CustomersAPI;

/*
	Create a new customer.

	@param req.body.data: {
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
	// Hmm. It seems that I was somehow placing info in the data tag at one point..?
	// console.log('incoming customer:', req.body.data.customer);
	console.log('incoming customer:', req.body.customer);

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
	// include an image from the images table

	Customers.all()
		.then(Help.sendStatusAndData(res, 200))
		.catch(Help.sendStatusAndError(res, 500, 'Server error fetching all customers'));
});

/*
	// example of downside building bottom -> up. This route may not be needed.

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
	Create a note for a customer.
	
	@param req.params: { customer_id: <Number> }
	@param req.body: {
		note: {
			content: <String>,
			author: <Number>,
			customer_id: <Number>,
			home_id: <Number>,
			room_id: <NUmber>,
		},
	}

	@return via response: { note_id: <Number> }
	OR
	status 500 with { error: <String> }
*/
CustomersAPI.post('/:customer_id/notes', function(req, res) {
	const customer_id = req.params.customer_id;
	const note = req.body.note;

	Notes.create(customer_id, note)
		.then(Help.sendStatusAndData(res, 200))
		.catch(Help.sendStatusAndError(res, 500, 'Server error creating note'));
});

/*
	Fetch all of a customer's notes.

	@param req.params: { customer_id: <Number> }
	
	@return via response: [
		{
			content: <String>
			author: <Number>
			customer_id: <Number>
			home_id: <Number/null>
			room_id: <Number/null>
		}
	]
	OR
	status 500 with { error: <String> }
*/
CustomersAPI.get('/:customer_id/notes', function(req, res) {
	const customer_id = req.params.customer_id;

	Notes.ofCustomer(customer_id)
		.then(Help.sendStatusAndData(res, 200))
		.catch(Help.sendStatusAndError(res, 500, 'Server error fetching notes'));
})

/*
	Update a customer entry. For posterity, do not update notes.

	@param req.params.customer_id: <number>
	@param req.body.data: {
		customer: {
			name: <String>,
			email: <String>,
			phone: <String>,
		}
	}

	@return via response status 200 OR status 500 with { error: <String> }
*/
CustomersAPI.put('/:customer_id', function(req, res) {
	const customer_id = req.params.customer_id;
	// $http.put does not send information in a shape like $http.post
	// post sends information to req.body.data and put sends it to req.body
	const customer = req.body.customer;

	// More of a thought than a concern. Don't want to/probably can't update a primary key.
	if ('customer_id' in customer) delete customer['customer_id'];

	Customers.updateById(customer_id, customer)
		.then(Help.sendStatus(res, 200))
		.catch(Help.sendStatusAndError(res, 500, 'Server error updating customer'));
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
CustomersAPI.get('/:customer_id/homes', function(req, res) {
	Homes.ofCustomerId(req.params.customer_id)
		.then(Help.sendStatusAndData(res, 200))
		.catch(Help.sendStatusAndError(res, 500, 'Server error getting all homes of customer'))
});

/*
	Create a new Home for customer @param customer_id.

	@param req.body.data: {
		home: {
			address <String>,
			sqft <Number>,
			stories <Number>,
			bath_count <Number>,
			bedroom_count <Number>,
			heater_type <String>,
			heater_install_date <String>,
			ac_type <Number>,
			ac_install_date <String>,
		}
	}

	@return via response {
		home_id: <Number>,
	}
	OR
	{ error: <String> }
*/
CustomersAPI.post('/:customer_id/homes', function(req, res) {
	Homes.create(req.params.customer_id, req.body.home)
		.then(Help.sendStatusAndData(res, 200))
		.catch(Help.sendStatusAndError(res, 500, 'Server error creating customer'));
});
