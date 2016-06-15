function HomeListController ($http,  $state, $stateParams) {
	const ctrl = this;

	ctrl.addingHome = false;
	ctrl.addHome = function() {
		ctrl.addingHome = !ctrl.addingHome;
	}

	ctrl.selectHome = function(_home) {
		console.log('Home selected:', _home);
		$state.go('roomList', { customer: $stateParams.customer, home: _home });
	};

	ctrl.$onInit = function() {
		console.log('initializing homeList', ctrl);
		const customer_id = $stateParams.customer.customer_id;

		// populate ctrl.homeList
		$http.get(`/customers/${customer_id}/homes`)
			.then(getHomeListSuccess, getHomeListError);
	}

	// See customerList getCustomersSuccess for an alternative solution
	function getHomeListSuccess(list) { ctrl.homeList = list.data; };
	function getHomeListError(error) {
		console.error("error retreiving customer's list of homes.\n", error);
		// inform error messager of error
		ctrl.homeList = [];
	}
}

angular.module('birdsNest').component('homeList', {
	templateUrl: '../views/homeList.html',
	controller: HomeListController,
});