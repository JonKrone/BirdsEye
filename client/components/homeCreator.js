function HomeCreatorController ($http, $stateParams, homeList) {
	const ctrl = this;
	ctrl.home = {};

	ctrl.submitHome = function() {
		console.log('homeCreator stateParams:', $stateParams);
		const customer_id = $stateParams.customer.customer_id;

		console.log('ctrl.home', ctrl.home);
		this.parent.homeList.push(ctrl.home);

		$http.post(`/customers/${customer_id}/homes`, { home: ctrl.home })
			.then(function(good) {
				console.log('success submitting home!!!', good);
			}, function(err) {
				console.log('error submitting home!!!', err);
				const idx = this.parent.homeList.indexOf(ctrl.homeList);
				this.parent.homeList.splice(idx, 1);
			});
	};

	ctrl.$onInit = function() {
		// Man. Wouldn't it be nice to sync data with local storage?!
		console.log('initializing customer creator');
	};
}

angular.module('birdsNest').component('homeCreator', {
	templateUrl: '../views/homeCreator.html',
	controller: HomeCreatorController,
	// From a design standpoint, I think that the homeCreator should be an
	// independent 'main' ui-view component; it is a primary behavior deserving much attention
	require: {
		parent: '^homeList',
	}
});