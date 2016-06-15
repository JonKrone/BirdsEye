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
		'auth0',
		'angular-storage',
		'angular-jwt'
	])
	.config(function($stateProvider, $urlRouterProvider, $logProvider,
		$httpProvider, $locationProvider, authProvider, jwtInterceptorProvider) {
		$logProvider.debugEnabled(true);
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('login', {
				url: '/login',
				views: {
					main: {  },
				},
			})
			.state('customerList', {
				url: '/',
				views: {
					main: { component: 'customerList' },
				},
				data: { requiresLogin: true },
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
				},
				data: { requiresLogin: true },
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
				data: { requiresLogin: true },
			})
			.state('roomList', {
				url: '/rooms',
				params: { customer: null, home: null },
				views: {
					main: { component: 'roomList' },
					sideBar: { component: 'homeDetail' },
					actionBar: { component: 'noteTaker' },
				}
				data: { requiresLogin: true },
			});

		/* Commence Auth0 Configuration */
		authProvider.init({
	    domain: 'jonkrone.auth0.com',
	    clientID: 'IuHh4hPijOeCWzLtswpO3C0sKWPDGoN6',
	    loginState: 'login',
		});

		//Called when login is successful
		authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
		  console.log("Login Success");
		  profilePromise.then(function(profile) {
		    store.set('profile', profile);
		    store.set('token', idToken);
		  });
		  $location.path('/');
		});

		//Called when login fails
		authProvider.on('loginFailure', function() {
		  console.log("Error logging in");
		  $location.path('/login');
		});

		//Angular HTTP Interceptor function
		// Retrieves the Auth0 token
		jwtInterceptorProvider.tokenGetter = function(store) {
		    return store.get('token');
		}

		//Push interceptor function to $httpProvider's interceptors
		// Attaches Auth0's JWT to every HTTP request we send out! Nice!
		$httpProvider.interceptors.push('jwtInterceptor');

	})
	.run(function($rootScope, auth) {
		auth.hookEvents();

	  $rootScope.$on("$stateChangeError", console.log.bind(console));
	});



// Set page authorization
//https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-create-rules-to-prevent-access-to-a-state

// Opening a modal. Useful often.
// https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-open-a-dialogmodal-at-a-certain-state

// Scroll down for good examples of a few aspects of routing state
// http://stackoverflow.com/questions/27744539/angular-ui-router-not-loading-controller-or-template