const Help = require(TEST_HELPER);

const db = require(__lib + '/db/connection');
const Customers = require(__models + '/rooms');
const Homes = require(__models + '/homes');
const Rooms = require(__models + '/rooms');

// Would be easier, when at a bigger scale, to abstract database seeding.
describe('Rooms model', function () {
	const arya = {
		name: "No One",
		email: "Cat@the.canals"
	}
	const treehouse = {
		address: "P. Sherman Wallaby Way",
		sqft: 1337,
		bath_count: 0,
		bedroom_count: 1,
		heater_type: "Volcano",
		heater_install_date: Date.now(),
	};
	const rumpusRoom = {
		type: "Rumpus",
		size: 300,
		story: -1,
	}
	const windows = {
		windows: 2,
	}
	let customer;
	let home;

	beforeEach_(function*() {
		yield Help.clean(db, { mode: 'truncate' });

		customer = yield Customers.create(arya);
		home = yield Homes.create(customer.customer_id, treehouse);
	});

	it_('should create a room', function*() {
		const room = yield Rooms.create(home.home_id, rumpusRoom);

		expect(room.room_id).to.be.ok;
	});

	it_('should update rooms by Id', function*() {
		const room = yield Rooms.create(home.home_id, rumpusRoom);
		yield Rooms.updateById(room.room_id, windows);
		const windowedRoom = yield Rooms.ofHomeId(home.home_id);

		expect(windowedRoom[0]).to.have.deep.property('winows', 2);
	});

	it_('should fetch rooms of a house', function*() {
		let rooms = yield Rooms.ofHomeId(home.home_id);
		expect(rooms).to.have.lengthOf(0);

		yield Rooms.create(home.home_id, rumpusRoom);
		let rooms = yield Rooms.ofHomeId(home.home_id);
		expect(rooms).to.have.lengthOf(1);
	});

});
