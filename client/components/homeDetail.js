function HomeDetailController($http, $stateParams) {
	const ctrl = this;

	ctrl.homeIsSelected = () => !!ctrl.currentHome();
	ctrl.currentHome = function() {
		if (!ctrl.selectedHome) ctrl.selectedHome = $stateParams.home;
	}

	ctrl.$onInit = function() {
		console.log('creating home DETAIL controller');
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