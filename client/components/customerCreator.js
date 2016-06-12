function CustomerCreatorController ($log) {

	this.$onInit = function() {
		$log.log('initializing customer creator');
	}
}

angular.module('birdsNest').component('customerCreator', {
	templateUrl: '../views/customerCreator.html',
	controller: CustomerCreatorController,
});