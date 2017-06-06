var app = angular.module('serverApp', []);

app.controller('serverCtrl', function($scope, $http, $interval) {

	$scope.name = "Akhil";
	$scope.lat = 18.5288963;
	$scope.lng = 73.87439059999997;
	console.log($scope.lat);




	var map, GeoMarker;

	function initialize() {
		var mapOptions = {
			zoom: 17,
			center: new google.maps.LatLng($scope.lat, $scope.lng),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById('map_canvas'),
			mapOptions);

		GeoMarker = new GeolocationMarker();
		GeoMarker.setCircleOptions({fillColor: '#808080'});
	  // GeoMarker.setCircleOptions({fillColor: '#808080',position: {lat: $scope.lat, lng: $scope.lng},visble:true});

	  // GeoMarker.setMarkerOptions({position: {lat: $scope.lat, lng: $scope.lng}});

	  google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
	  	map.setCenter(this.getPosition());
	  	map.fitBounds(this.getBounds());
	  });

	  google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
	  	alert('There was an error obtaining your position. Message: ' + e.message);
	  });

	  GeoMarker.setMap(map);
	}


	$interval(function() {
		$http.get('../json/current_location_map.json').then(function(response) {
			$scope.location = response.data;
			console.log($scope.location);
			$scope.lat = $scope.location[0];
			$scope.lng = $scope.location[1];
		});

		initialize();
	},5000);


	// google.maps.event.addDomListener(window, 'load', initialize);

	if(!navigator.geolocation) {
		alert('Your browser does not support geolocation');
	}



});

