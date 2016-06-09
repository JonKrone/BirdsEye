const Help = require(TEST_HELPER);

const db = require(__lib + '/db/connection');
const Customers = require(__models + '/customers');

describe('Customers model', function () {

	beforeEach_(function *() {
		yield Help.clean(db, { mode: 'truncate' });
	})

	it_('should create a customer', function*() {
		const robin = {
			name: "Robin Ranger",
			email: "robin@tree.house",
			phone: "512" + "333" + "7777",
			aspirations: ['to be', 'or not', 'to be'],
		}

		const customer = yield Customers.create(robin);
		expect(customer).to.have.all.keys('name', 'email', 'phone', 'aspirations');
	});

	it_('should require a name and email', function*() {
		const invalid = {
			name: "",
			email: "",
		};

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