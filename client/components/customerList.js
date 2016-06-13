function CustomerListController($http, $state) {
	const ctrl = this;

	// Loaded via $http in onInit
	ctrl.customerList = [];

	ctrl.adding = false;
	ctrl.addCustomer = function() {
		ctrl.adding = !ctrl.adding;
	}

	ctrl.selectCustomer = function(_customer) {
		console.log('Customer selected:', _customer);
		ctrl.currentCustomer = _customer;
		$state.go('homeList', {customer: _customer} )
	};


	ctrl.$onInit = function() {
		$http.get('/customers')
			.then(handleCustomerResponse, handleCustomerError);
	}

	function handleCustomerResponse(res) {
		// Set localStorage so we can refer if we lose connection / help restore state.
		// SERVICE WORKERRR! To the rescue!
		res.data.push({ name: "ra ta ta ta" });
		angular.copy(res.data, ctrl.customerList);
	}

	function handleCustomerError(res) {
		// load from localStorage if possible.
		// Service worker may dissuade errors from happening.

		// inform super parent of error to display.
	}
}

angular.module('birdsNest').component('customerList', {
	templateUrl: '../views/customerList.html',
	controller: CustomerListController,
	// bindings: {
	// 	customerList: '=',
	// },
	// require: {
	// 	parentCtrl: '^ctrlName',
	// }
});
