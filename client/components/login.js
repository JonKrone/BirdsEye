function LoginController ($scope, auth) {
	$scope.auth = auth;
}

angular.module('birdsNest').component('login', {
	templateUrl: "../views/login.html",
	controller: LoginController,
});