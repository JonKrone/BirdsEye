/*
	Okay, the first big mistake:
	I specifically chose to not nest my states. Mostly as a method of reducing
	new knowledge overhead. Problems (or inefficient solutions) may now be arising
	because the view states are all independent. I first noticed this when, as is
	so often the case with state issues, navigating back from the rooms state.
	The application lost a reference to the customer.

	A workaround in these cases: we can use the detail components as a 'back' button
	and explicitly pass the data to render the previous state. 
*/

/*
	Overall TODO
		- Note taking
		- Image upload
		- Users
*/
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
					main: { component: 'customerList' },
				},
			})
			// The customerCreator state is not being used atm. Note: state change causes refresh.
			// note: resolving is helpful. note: views are cool. note: notes are useful.
			// on a more serious note: From what I've gathered, each state will have to have a
			// 'resolve' "rule" to authorize a user. Hmm. I bet an abstract state could help
			// us there. But then we'd have to preface everything with 'authd.customerList'.
			// egh. I wonder what alternatives exist.
			.state('customerCreator', {
				url: '/create',
				views: {
					main: { component: 'customerList' },
					// bottomBar: { component: 'customerCreator' }
				},
				resolve: {
					log: function() {
						console.log('Loading customer CREATOR.');
					}
				}
			})
			// first real piece of state work
			// NOTE: our url gives no indication as to which customer we are viewing. This is a huge problem
			// for state management, especially when sharing URLs. This might be worth implementing during
			// this challenge if I have time.
			// NOTE: I have read that it is not possible to have 'params' and url params.
			.state('homeList', {
				url: '/homes',
				params: { customer: null },
				views: {
					main: { component: 'homeList' },
					sideBar: { component: 'customerDetail' },
					// homeCreator as it stands can not function as a standalone component.
					// bottomBar: { component: 'homeCreator' }, // or: noteTaker and homeCreator a part of homeList
					actionBar: { component: 'noteTaker' },
				},
			})
			.state('roomList', {
				url: '/rooms',
				params: { customer: null, home: null },
				views: {
					main: { component: 'roomList' },
					sideBar: { component: 'homeDetail' },
					actionBar: { component: 'noteTaker' },
				}
			});
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