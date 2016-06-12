angular.module('birdsNest', [
		'ui.router',
	])
	.config(function($stateProvider, $urlRouterProvider, $logProvider) {
		$logProvider.debugEnabled(true);
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('customerList', {
				url: '/',
				views: {
					main: { component: 'customerList' }
				},
			})
			.state('customerCreator', {
				url: '/create',
				views: {
					main: { component: 'customerList' },
					bottomBar: 'customerCreator',
				},
				resolve: {
					log: function() {
						console.log('Loading customer CREATOR.');
					}
				}
			})
			// .state('homesList', {
			// 	url: '/homes',
			// 	component: 'homesList',
			// 	resolve: {
			// 		homesList: function($http /*, $stateParams for access to url params */) {
			// 			// HOW TO ACCESS :customer_id?
			// 			// const customer_id = $stateParams.params.customer_id;
			// 			return $http.get(`/customers/${customer_id}/homes`)
			// 				.then(function(list) {
			// 					return list;
			// 				}, function(err) {
			// 					console.error("error retrieving customer's list of homes.\n", err);
			// 					// inform error messager of error
			// 				})
			// 		}
			// 	}
			// });
	})
	.run(function($rootScope) {
	  $rootScope.$on("$stateChangeError", console.log.bind(console));
	});



// Set page authorization
//https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-create-rules-to-prevent-access-to-a-state

// Opening a modal. Useful often.
// https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-open-a-dialogmodal-at-a-certain-state

// Scroll down for good examples of a few aspects of routing state
// http://stackoverflow.com/questions/27744539/angular-ui-router-not-loading-controller-or-template