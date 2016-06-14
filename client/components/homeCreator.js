function HomeCreatorController ($http, $stateParams) {
	const ctrl = this;
	ctrl.home = {};

	// Temp work, don't add home to list (still need to show a sumamry)
	ctrl.submitHome = function() {
		const customer_id = $stateParams.customer.customer_id;
		$http.post(`/customers/${customer_id}/homes`, { home: ctrl.home })
			.then(postHomeSuccess, postHomeError);
	};

	ctrl.$onInit = function() {
		// Man. Wouldn't it be nice to sync data with local storage?!
		console.log('initializing customer creator');
	};

	function postHomeSuccess(response) {
		ctrl.home.home_id = response.data.home_id;
		ctrl.parent.homeList.push(ctrl.home);

		// prevent data from this entry appearing in the next home created.
		ctrl.home = {};
	}

	function postHomeError(error) {
		console.log('error submitting home! :(', error);
		// inform messaging component
	}
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