function CustomerListController($http, $element) {
	const ctrl = this;

	// Loaded via $http in onInit
	ctrl.customerList = [];

	ctrl.adding = false;
	ctrl.addCustomer = function() {
		ctrl.adding = !ctrl.adding;
	}

	ctrl.selectCustomer = function(customer) {
		console.log('Customer selected:', customer);
		// trigger UI routing.
	};


	ctrl.$onInit = function() {
		console.log('initializing customerList');
		$http.get('/customers')
			.then(handleCustomerResponse, handleCustomerError);
	}

	function handleCustomerResponse(res) {
		// Set localStorage so we can refer if we lose connection / help restore state.
		res.data.push({ name: "ra ta ta ta" });
		angular.copy(res.data, ctrl.customerList);
	}

	function handleCustomerError(res) {
		// load from localStorage if possible.
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
