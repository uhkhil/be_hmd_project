var app = angular.module('serverApp', []);

app.controller('serverCtrl', function($scope) {

	$scope.name = "Akhil";
	$scope.lat = 18.5288963;
	$scope.lng = 73.87439059999997;
	console.log($scope.lat);

});
