

function CustomerListController($log, $element, $attrs, $http) {
	const ctrl = this;
	$log.log(' :) loading customerList Controller');

	// Load via $http
	ctrl.customerList = $http.get('/customers')
		.then(handleCustomerResponse, handleCustomerError);

	ctrl.clickCustomer = function(customer) {
		// const idx = ctrl.customerList.indexOf(customer);

		if (idx >= 0) {
			// trigger angular routing with customer object
		}
	};

	ctrl.yell = function(customer) {
		console.log('Why arent we logging?');
		$log.debug('Why we arent logging?');
		$log.info('here here');

		ctrl.customerList.push({
			name: "Robin Ranger",
			email: "robin@tree.house",
			phone: "512" + "333" + "7777",
			notes: ['to be', 'or not', 'to be'],
		});
	};

	ctrl.$onInit = function() {
		console.log('Why arent we logging?');
		$log.debug('Why we arent logging?');
		$log.info('here here');

		ctrl.customerList.push({
			name: 'Arya',
			email: 'jj@jj.om',
		});
	}

	function handleCustomerResponse(res) { return res.data; }
	function handleCustomerError(res) {
		ctrl.customerList = [];
	}
}

angular.module('birdsNest').component('customerList', {
	templateUrl: '../views/customerList.html',
	controller: CustomerListController,
	controllerAs: "customerCtrl",
});
