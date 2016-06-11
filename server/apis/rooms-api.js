const Help = require('../server-helper');
const Rooms = require(__models + '/rooms');

const RoomsAPI = require('express').Router();

module.exports = RoomsAPI;

/*
	Update a room!

	@param req.params.room_id: room to update
	@param req.body: {
		rooms: {
			name: <String>,
			type: <String>,
			size: <Number>,
			story: <Number>,
			windows: <Number>,
		}
	}

	@return via response: status 200 or status 500 with { error: <String> }
*/
RoomsAPI.put('/:room_id', function(req, res){
	Rooms.updateById(req.params.room_id, req.body.room)
		.then(Help.sendStatus(res, 200))
		.catch(Help.sendStatusAndError(res, 500, 'Server error updating home by id'));
});
