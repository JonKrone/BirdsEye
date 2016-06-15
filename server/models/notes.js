const Help = require('../server-helper');

const db = require(__lib + 'db/connection');
const Notes = module.exports;

/*
	Create a note. Notes have a tier of ownership: customer, home, room.

	@param note {
		content: <String>,
		author: <Number> user who wrote note,
		customer_id: <Number> customer related to note,
		home_id: <Number, optional> home related to note,
		room_id: <Number, optional> room related to note,
	}
*/
Notes.create = function(note) {
	console.log('creating note:', note);
	return db('notes')
		// .returning(['note_id'])
		.insert(note, ['note_id'])
		.then(Help.first)
		.catch(Help.reportError('Creating note'));
};

// Fetch all the notes of customer @param _customer_id
Notes.ofCustomer = function(_customer_id) {
	console.log('fetching notes of customer:', _customer_id);
	return db('notes')
		.where({ customer_id: _customer_id })
		.select('*')
		.catch(Help.reportError('Retrieving notes of a customer'));
}

