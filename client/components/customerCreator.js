function CustomerCreatorController ($log, $http) {
	const ctrl = this;
	ctrl.customer = {};

	ctrl.submitCustomer = function() {
		// const customer = customerFromField($element);
		console.log('ctrl.customer', ctrl.customer);

		$http.post('/customers', { customer: ctrl.customer })
			.then(function(good) {
				console.log('success!!!', good);
			}, function(err) {
				console.log('error!!!', err);
			});
	};

	ctrl.$onInit = function() {
		$log.log('initializing customer creator');
	};

	function submitCustomerSuccess() {

	}
}

angular.module('birdsNest').component('customerCreator', {
	templateUrl: '../views/customerCreator.html',
	controller: CustomerCreatorController,
});