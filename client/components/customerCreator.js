function CustomerCreatorController ($log, $http, $state) {
	const ctrl = this;
	ctrl.customer = {};

	ctrl.submitCustomer = function() {
		ctrl.parent.customerList.push(ctrl.customer);

		$http.post('/customers', { customer: ctrl.customer })
			.then(postCustomerSuccess, postCustomerError);
	};

	ctrl.$onInit = function() {
		// Man. Wouldn't it be nice to sync data with local storage?!
		console.log('initializing customer creator');
	};

	function postCustomerSuccess(response) {
		// While we could mutate ctrl.customer directly, it is a bad pattern to augment
		// another controller's data. This is a more explicit yet still hacky solution.
		// A better solution that maintains responsiveness (adds customer to list before confirmation)
		// and adds the post-confirm customer_id would be a method on the customerList component.
		const customerInCustomerList = 
			ctrl.parent.customerList.find((cust) => cust === ctrl.customer)
		customerInCustomerList.customer_id = response.data.customer_id;

		// prevent data from this submission being shown in the next submission.
		ctrl.customer = {};

		ctrl.parent.adding = false;

		$state.go('/homeList', { customer: ctrl.customer })
	}

	function postCustomerError(error) {
		// inform messaging component. for now:
		console.error('Error creating a customer.', error);

		if (!this.parent.customerList) return;

		const idx = this.parent.customerList.indexOf(ctrl.customer);
		this.parent.customerList.splice(idx, 1);
	}
}

angular.module('birdsNest').component('customerCreator', {
	templateUrl: '../views/customerCreator.html',
	controller: CustomerCreatorController,
	require: {
		parent: '^customerList',
	}
});