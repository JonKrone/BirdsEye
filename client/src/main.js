angular.module('birdsNest')
	.controller('MainCtrl', ['$scope', function($scope) {
		$scope.helloWorld = "Hey there, little ants!";
		$scope.buttonText = "Squish 'em!";
	}]);