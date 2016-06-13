function CustomerCreatorController ($log, $http) {
	const ctrl = this;
	ctrl.customer = {};

	ctrl.submitCustomer = function() {
		console.log('ctrl.customer', ctrl.customer);
		// To be more responsive, pre-emptive customerList.push(ctrl.customer);

		$http.post('/customers', { customer: ctrl.customer })
			.then(function(good) {
				console.log('success!!!', good);
			}, function(err) {
				console.log('error!!!', err);
				// remove customerList.indexOf(ctrl.customer);
			});
	};

	ctrl.$onInit = function() {
		// Man. Wouldn't it be nice to sync data with local storage?!
		$log.log('initializing customer creator');
	};

	function submitCustomerSuccess() {

	}
}

angular.module('birdsNest').component('customerCreator', {
	templateUrl: '../views/customerCreator.html',
	controller: CustomerCreatorController,
	// bindings: {
	// 	customerList: '=',
	// }
});