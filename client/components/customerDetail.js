function CustomerDetailController() {
	this.$onInit = function() {
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