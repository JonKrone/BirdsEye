function CustomerListController($http) {
	const ctrl = this;

	// Loaded via $http in onInit
	ctrl.customerList = [];

	ctrl.selectCustomer = function(customer) {
		console.log('Customer selected:', customer);

		// trigger UI routing.
	};

	ctrl.yell = function(customer) {
		console.log('Why arent we logging?');
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
		console.log('customerList:', ctrl.customerList);
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
