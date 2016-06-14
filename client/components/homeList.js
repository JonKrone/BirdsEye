function HomesListController (_homeList) {
	const ctrl = this;

	ctrl.adding = false;
	ctrl.addHome = function() {
		ctrl.adding = !ctrl.adding;
	}

	ctrl.selectHome = function(_home) {
		console.log('Home selected:', _home);
		ctrl.currentHome = _home;
		// $state.go('homeEdit', { home: _home });
	};

	ctrl.onInit = function() {
		ctrl.homeList = _homeList;
	}
}

angular.module('birdsNest').component('homeList', {
	templateUrl: '../views/homeList.html',
	controller: HomesListController,
});