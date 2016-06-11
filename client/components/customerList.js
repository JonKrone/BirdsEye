function CustomerListController($scope, $element, $attrs, $http) {
	const ctrl = this;

	// Load via $http
	ctrl.customerList; 

	ctrl.clickCustomer = function(customer) {
		const idx = ctrl.customerList.indexOf(customer);

		if (idx >= 0) {
			// trigger angular routing.
		}
	};

}

angular.module('birdsNest').component('customerList', {
	templateUrl: '../customerList.html',
	controller: CustomerListController,
});