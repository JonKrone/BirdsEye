require(TEST_HELPER);

const db = require(__lib + '/db/connection');
const Customers = require(__models + '/customers');

describe('Customers model', function () {

	it_('should create a customer', function*() {
		const robin = {
			name: "Robin Ranger",
			email: "robin@tree.house",
			phone: "512" + "333" + "7777",
		}

		const customer = yield Customers.create(robin);
		console.log('created customer:', customer);

		expect(customer).to.have.all.keys('name', 'email', 'phone', 'aspirations');
		expect(customer.aspirations).to.have.lengthOf(0);
	});

	it_('should require a name and email', function*() {
		const invalid = {
			name: "",
			email: "",
		};

		const customer = yield Customers.create(invalid);
		console.log('invalid customer:', customer);
		expect(customer).to.throw(Error);
		expect(customer).to.not.be.okay;
	});

	it_('should delete customers by ID', function*() {
		// create a customer
		const robin = {
			name: "Robin Ranger",
			email: "robin@tree.house",
			phone: "512" + "333" + "7777",
		}
		const customer = yield Customers.create(robin);

		const removed = yield Customers.removeById(customer.customer_id);
		expect(removed).to.be.true;

		const customerCount = yield Customers.count();
		expect(customerCount).to.equal(0);
	});

})