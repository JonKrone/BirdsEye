const Help = require('../server-helper');

const db = require(__lib + 'db/connection');
const Rooms = module.exports;

/*
	Create a room!

	@param home_id: home this room belongs to
	@param room: {
		name: <String>,
		type: <String>,
		size: <Number>,
		story: <Number>,
		windows: <Number>,
	}

	@return {
		room_id: <Number>,
	}
*/
Rooms.create = function(_home_id, room) {
	room.home_id = _home_id;

	return db('rooms')
		.returning('room_id')
		.insert(room)
		.then(Help.first)
		.catch(Help.reportError('Creating room'));
};

/*
	Update room @param _room_id with @param updates

	@param updates: {
		type: <String>,
		size: <Number>,
		windows: <Number>,
		story: <Number>,
		name: <String>,
	}

	@return: <Number> of rows updated
*/
Rooms.updateById = function(_room_id, updates) {
	// home_id is a constant SQL column, it can not be changed.

	return db('rooms')
		.where({ room_id: _room_id })
		.update(updates)
		.catch(Help.reportError('Updating room by id'));
};

// Fetch all rooms of home @param _home_id
Rooms.ofHomeId = function(_home_id) {
	return db('rooms')
		.where({ home_id: _home_id })
		.catch(Help.reportError('Finding rooms for home by id'));
};
