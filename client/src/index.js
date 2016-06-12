angular.module('birdsNest')
	.controller('CustomerCtrl', ['$scope', function($scope) {
		$scope.helloWorld = "Hey there, little ants!";
		$scope.buttonText = "Squish 'em!";
	}]);