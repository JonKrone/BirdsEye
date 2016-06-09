const Help = require(TEST_HELPER);

const db = require(__lib + '/db/connection');
const Homes = require(__models + '/homes');
const Customers = require(__models + '/customers');

describe('Homes model', function () {
	const treehouse = {
		address: "P. Sherman Wallaby Way",
		sqft: 1337,
		bath_count: 0,
		bedroom_count: 1,
		heater_type: "Volcano",
		heater_install_date: Date.now(),
		ac_type: "Westerlies",
		ac_install_date: Date.now(),
	};
	const robin = {
		name: "Robin Ranger",
		email: "robin@tree.house",
		phone: "512" + "333" + "7777",
		notes: ['to be', 'or not', 'to be'],
	}

	beforeEach_(function *() {
		yield Help.clean(db, { mode: 'truncate' });
	})

	it_('should create a home', function*() {
		const customer = yield Customers.create(robin);
		const home = yield Homes.create(customer.customer_id, treehouse);
		expect(home).to.have.all.keys('home_id');
	})

	it_("should update a home's information", function*() {
		const extension = {
			sqft: 1663,
			bath_count: 1,
			stories: 2,
		};

		const home = yield Homes.create(treehouse);
		yield Homes.updateById(home.home_id, extension);
		const newHome = yield Homes.findById(home.home_id);
		
		expect(newHome.stories).to.equal(2);
		expect(newHome.heater_type).to.equal("Volcano");
	})

})
