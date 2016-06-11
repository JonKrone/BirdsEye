function CustomerDetailController() {

}

angular.module('birdsNest').component('customerDetail', {
	templateUrl: 'customerDetail.html',
	controller: CustomerDetailController,
	bindings: {
		customer: '<',
		onClick: '&',
	},
});