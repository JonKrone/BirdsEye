function CustomerDetailController($http, $stateParams) {
	const ctrl = this;

	// This object is for temporary storage of form information.
	ctrl.customerUpdates = {};

	ctrl.customerIsSelected = () => !!ctrl.currentCustomer();

	ctrl.currentCustomer = function() {
		if (!ctrl.selectedCustomer)	ctrl.selectedCustomer = $stateParams.customer;
		return ctrl.selectedCustomer;
	}

	// TBA (To Be Abstracted) to editable-field components.
	ctrl.hasEmail = function() { return ctrl.selectedCustomer && ctrl.selectedCustomer.email };
	ctrl.hasPhone = function() { return ctrl.selectedCustomer && ctrl.selectedCustomer.phone };

	// better: break this out into updatePhone and updateEmail to track and revert specific fields.
	ctrl.updateCustomer = function() {
		const customer_id = ctrl.currentCustomer().customer_id;
		$http.put(`/customers/${customer_id}`, { customer: ctrl.customerUpdates } )
			.then(putCustomerSuccess, putCustomerError);
	};

	ctrl.$onInit = function() { /* noop */ };

	function putCustomerSuccess(data) {
		console.log('Successful customers PUT:', data);
		angular.merge(ctrl.selectedCustomer, ctrl.customerUpdates);
		// merge data with parent's customerList?
		// to do this, it might be best to set two-way binding of customer and update.
	}

	function putCustomerError(error) {
		console.error('Bad customers PUT:', error);
		// inform messaging component
	}
}

angular.module('birdsNest').component('customerDetail', {
	templateUrl: '../views/customerDetail.html',
	controller: CustomerDetailController,
	bindings: {
		customer: '<',
	},
});