function CustomerDetailController($http, $stateParams) {
	const ctrl = this;

	// This object is for temporary storage of form information.
	ctrl.customerUpdates = {};

	ctrl.customerIsSelected = () => !!ctrl.currentCustomer();

	ctrl.hasEmail = function() {
		return ctrl.selectedCustomer && ctrl.selectedCustomer.email
	};

	ctrl.hasPhone = function() {
		return ctrl.selectedCustomer && ctrl.selectedCustomer.phone
	}

	// better: break this out into updatePhone and updateEmail to track and revert specific fields.
	ctrl.updateCustomer = function() {
		const customer_id = ctrl.currentCustomer().customer_id;
		$http.put(`/customers/${customer_id}`, { customer: ctrl.customerUpdates } )
			.then(function(data) {
				console.log('Successful customers PUT:', data);
				angular.merge(ctrl.selectedCustomer, ctrl.customerUpdates);
			}, function(error) {
				console.error('Bad customers PUT:', error);
				// reset 
			});
	};

	ctrl.$onInit = function() {
		console.log('creating customer DETAIL controller');
	};

	ctrl.currentCustomer = function() {
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