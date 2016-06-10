const Help = require('../server-helper');
const Homes = require(__models + '/customers');

const HomesAPI = require('express').Router();

module.exports = CustomersAPI;

// When identifying a particular home for a PUT or GET operation, include
// a home_id parameter in the req.body.

/*
	Create a new Home for customer @param customer_id.

	@param req.body: {
		customer_id: <Number>,
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
HomesAPI.post('/', function(req, res) {
	Homes.create(req.body.home)
		.then(Help.sendStatusAndData(res, 200))
		.catch(Help.sendStatusAndError(res, 500, 'Server error creating customer'));
});

HomesAPI.put('/:home_id', function(req, res){
	Homes.updateById(req.params.home_id, req.body.home)
		.then(Help.sendStatus(res, 200))
		.catch(Help.sendStatusAndError(res, 500, 'Server error updating home by id'));
});

// May not be necessary
// HomesAPI.get('/', function(req, res){
// 	Homes.findById
// });
