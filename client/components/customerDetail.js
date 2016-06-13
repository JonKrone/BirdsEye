function CustomerDetailController($http, $stateParams) {
	const ctrl = this;


	ctrl.currentCustomer = function() {
		if (!ctrl.selectedCustomer)	ctrl.selectedCustomer = $stateParams.customer;

		return ctrl.selectedCustomer;
	}

	ctrl.customerIsSelected = () => !!ctrl.currentCustomer();
	ctrl.hasEmail = () => !!ctrl.currentCustomer().email;
	ctrl.hasPhone = () => !!ctrl.currentCustomer().phone;

	ctrl.updateCustomer = function() {
		const customer_id = ctrl.currentCustomer().customer_id;
		$http.put(`/customers/${customer_id}`, { customer: ctrl.currentCustomer() } )
			.then(function(data) {
				console.log('Successful customers PUT:', data);
				// modify current customer? 
			}, function(error) {
				console.error('Bad customers PUT:', error);
				// reset customer.email/phone
			});
	}

	ctrl.$onInit = function() {
		console.log('creating customer DETAIL controller');
	}
}

angular.module('birdsNest').component('customerDetail', {
	templateUrl: '../views/customerDetail.html',
	controller: CustomerDetailController,
	bindings: {
		customer: '<',
	},
});