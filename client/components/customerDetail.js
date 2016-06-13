function CustomerDetailController($http, $stateParams) {
	const ctrl = this;

	// This object is for temporary storage of form information.
	ctrl.customerUpdates = {
		name: null,
		email: null,
		phone: null,
	};

	ctrl.customerIsSelected = () => !!currentCustomer();

	ctrl.hasEmail = function() {
		return ctrl.selectedCustomer && 'email' in ctrl.selectedCustomer;
	};

	ctrl.hasPhone = function() {
		return ctrl.selectedCustomer && 'phone' in ctrl.selectedCustomer;
	}

	ctrl.updateCustomer = function() {
		const customer_id = ctrl.currentCustomer().customer_id;
		$http.put(`/customers/${customer_id}`, { customer: ctrl.customerUpdates } )
			.then(function(data) {
				console.log('Successful customers PUT:', data);
				// modify current customer? 
			}, function(error) {
				console.error('Bad customers PUT:', error);
				// reset customer.email/phone
			});
	};

	ctrl.$onInit = function() {
		console.log('creating customer DETAIL controller');
	};

	function currentCustomer() {
		if (!ctrl.selectedCustomer)	ctrl.selectedCustomer = $stateParams.customer;

		return ctrl.selectedCustomer;
	}
}

angular.module('birdsNest').component('customerDetail', {
	templateUrl: '../views/customerDetail.html',
	controller: CustomerDetailController,
	bindings: {
		customer: '<',
	},
});