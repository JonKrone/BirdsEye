function LoginController ($scope, auth, store) {
	$scope.auth = auth;

	$scope.logout = function() {
	  auth.signout();
	  store.remove('profile');
	  store.remove('token');
	  $location.path('/login');
	}
}

angular.module('birdsNest').component('login', {
	templateUrl: "../views/login.html",
	controller: LoginController,
});