const Help = require('../server-helper');
const Homes = require(__models + '/homes');

const HomesAPI = require('express').Router();

module.exports = HomesAPI;

/*
	Update a home entry for home @param home_id

	@param req.params.home_id: home to update
	@param req.body: {
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

	@return via response: status 200 or status 500 with { error: <String> }
*/
HomesAPI.put('/:home_id', function(req, res){
	Homes.updateById(req.params.home_id, req.body.home)
		.then(Help.sendStatus(res, 200))
		.catch(Help.sendStatusAndError(res, 500, 'Server error updating home by id'));
});

/*
	Create a room in home @param home_id

	@param req.params.home_id: home this room belongs to
	@param req.body: {
		room: {
			home_id: <Number>,
			type: <String>,
			sqft: <Number>,
			windows: <Number>,
			story: <Number>,
			name: <String>,
		}
	}

	@return via response: status 200 OR status 500 with { error: <String> }
*/
HomesAPI.post('/:home_id/rooms', function(req, res) {
	Rooms.create(req.params.home_id, req.body.room)
		.then(sendStatusAndData(res, 200))
		.catch(SendStatusAndError(res, 500, 'Creating room in home'));
});
