const Help = require('../server-helper');
const Homes = require(__models + '/customers');

const HomesAPI = require('express').Router();

module.exports = HomesAPI;

/*
	Update a home entry for home @param home_id

	@param req.params.home_id: home to update
	@param req.body: {
		home: {
			see param list for POST '/'
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
			size: <Number>,
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
