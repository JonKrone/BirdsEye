function CustomerCreatorController ($log, $http) {
	const ctrl = this;
	ctrl.customer = {};

	ctrl.submitCustomer = function() {
		console.log('ctrl.customer', ctrl.customer);
		this.parent.customerList.push(ctrl.customer);

		$http.post('/customers', { customer: ctrl.customer })
			.then(function(good) {
				console.log('success!!!', good);
			}, function(err) {
				console.log('error!!!', err);
				const idx = this.parent.customerList.indexOf(ctrl.customer);
				this.parent.customerList.splice(idx, 1);
			});
	};

	ctrl.$onInit = function() {
		// Man. Wouldn't it be nice to sync data with local storage?!
		$log.log('initializing customer creator');
	};
}

angular.module('birdsNest').component('customerCreator', {
	templateUrl: '../views/customerCreator.html',
	controller: CustomerCreatorController,
	require: {
		parent: '^customerList',
	}
});