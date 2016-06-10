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
	let customer1;
	let customer2;

	beforeEach_(function *() {
		yield Help.clean(db, { mode: 'truncate' });

		const robin = {
			name: "Robin Ranger",
			email: "robin@tree.house",
			phone: "512" + "333" + "7777",
			notes: ['to be', 'or not', 'to be'],
		};
		const arya = {
			name: "No One",
			email: "Cat@the.canals"
		}
		customer1 = yield Customers.create(robin);
		customer2 = yield Customers.create(arya);
	})

	it_('should create a home', function*() {
		const home = yield Homes.create(customer1.customer_id, treehouse);
		expect(home).to.have.all.keys('home_id');
	})

	it_("should update a home's information", function*() {
		const extension = {
			sqft: 1663,
			bath_count: 1,
			stories: 2,
		};

		const home = yield Homes.create(customer1.customer_id, treehouse);
		yield Homes.updateById(home.home_id, extension);
		const newTreehouse = yield Homes.findById(home.home_id);
		
		expect(newTreehouse.stories).to.equal(2);
		expect(newTreehouse.heater_type).to.equal("Volcano");
	})

	it_("should retrieve a list of homes associated with a customer", function*() {
		let customer1Homes = yield Homes.ofCustomerId(customer1.customer_id);
		expect(customer1Homes).to.have.lengthOf(0);

		yield Homes.create(customer1.customer_id, treehouse);
		customer1Homes = yield Homes.ofCustomerId(customer1.customer_id);
		expect(customer1Homes).to.have.lengthOf(1);

		customer2Homes = yield Homes.ofCustomerId(customer2.customer_id);
		expect(customer2Homes).to.have.lengthOf(0);
	})
})
