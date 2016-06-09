const Help = require(TEST_HELPER);

const db = require(__lib + '/db/connection');
const Homes = require(__models + '/homes');

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
	}

	beforeEach_(function *() {
		yield Help.clean(db, { mode: 'truncate' });
	})

	it_.only('should create a home', function*() {
		const home = yield Homes.create(treehouse);
		expect(home).to.have.all.keys('home_id');
	});

	it_("should update a home's information", function*() {
		const treehouse = {

		}

		yield Customers.create(invalid)
			.then(function() {
				// Test fails upon entry into this callback.
				expect(false).to.be.true
			})
			.catch(function(error) {
				expect(error).to.exist;
			});
	});

	it_('should delete customers by ID', function*() {
		// create a customer
		const robin = {
			name: "Robin Ranger",
			email: "robin@tree.house",
			phone: "512" + "333" + "7777",
		}
		const customer = yield Customers.create(robin);

		const numRemoved = yield Customers.deleteByEmail(customer.email);
		expect(numRemoved).to.equal(1);
	});
});