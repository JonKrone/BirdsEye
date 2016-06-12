angular.module('birdsNest', [
		'ui.router',
	])
	.config(function($stateProvider, $urlRouterProvider, $logProvider) {
		$logProvider.debugEnabled(true);
		$urlRouterProvider.otherwise('/');

		// $stateProvider
			// .state('home', {
			// 	url: '/',
			// 	templateUrl: 'views/customerList.html',
			// 	controller: 'MainCtrl',
			// })
			// .state('about', {
			// 	url: '/about',
			// 	templateUrl: 'views/about.html',
			// 	controller: 'AboutCtrl',
			// });
	});