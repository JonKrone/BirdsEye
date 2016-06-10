const Help = require(TEST_HELPER);

const db = require(__lib + '/db/connection');
const Customers = require(__models + '/customers');

describe('Customers model', function () {
	const robin = {
		name: "Robin Ranger",
		email: "robin@tree.house",
		phone: "512" + "333" + "7777",
		notes: ['to be', 'or not', 'to be'],
	}
	const arya = {
		name: "No One",
		email: "Cat@the.canals"
	}

	beforeEach_(function *() {
		yield Help.clean(db, { mode: 'truncate' });
	});

	it_('should create a customer', function*() {
		const customer = yield Customers.create(robin);
		expect(customer).to.have.all.keys('customer_id', 'name', 'email', 'phone', 'notes');
	});

	it_('should retrieve a list of all customers', function*() {
		let customerCount = yield Customers.all()
		expect(customerCount).to.have.lengthOf(0);

		yield Customers.create(robin);
		yield Customers.create(arya);

		customerCount = yield Customers.all();
		expect(customerCount).to.have.lengthOf(2);
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
		const customer = yield Customers.create(robin);

		const numRemoved = yield Customers.deleteById(customer.customer_id);
		expect(numRemoved).to.equal(1);
	});
});
