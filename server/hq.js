var app = angular.module('serverApp', []);

app.controller('serverCtrl', function($scope, $http, $interval) {

	$scope.name = "Akhil";
	$scope.lat = 18.5288963;
	$scope.lng = 73.87439059999997;
	console.log($scope.lat);


	// $interval(function() {
	// 	$http.get('../json/current_location_map.json').then(function(response) {
	// 		$scope.location = response.data;
	// 		console.log($scope.location);
	// 		$scope.lat = $scope.location[0];
	// 		$scope.lng = $scope.location[1];
	// 	});

	// },5000);

});
