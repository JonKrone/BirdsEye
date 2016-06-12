

function CustomerListController($log, $scope, $element, $attrs, $http) {
	const ctrl = this;
	$log.log(':) loading customerList Controller');

	// Load via $http
	ctrl.customerList = [];

	ctrl.clickCustomer = function(customer) {
		// const idx = ctrl.customerList.indexOf(customer);

		if (idx >= 0) {
			// trigger angular routing with customer object
		}
	};

	ctrl.yell = function(customer) {
		console.log('Why arent we logging?');

		ctrl.customerList.push({
			name: "Robin Ranger",
			email: "robin@tree.house",
			phone: "512" + "333" + "7777",
			notes: ['to be', 'or not', 'to be'],
		});
	};

	ctrl.$onInit = function() {
		console.log('Why arent we logging?');

		ctrl.customerList = $http.get('/customers')
			.then(handleCustomerResponse, handleCustomerError)
			.then(console.log);
	}

	function handleCustomerResponse(res) { return res.data; }
	function handleCustomerError(res) {
		// inform super parent of error to display.
	}
}

angular.module('birdsNest').component('customerList', {
	templateUrl: '../views/customerList.html',
	controller: CustomerListController,
	controllerAs: "customerCtrl",
	bindings: {
		customerList: '<',
	},
	// require: {
	// 	parentCtrl: '^ctrlName',
	// }
});
