var app = angular.module('serverApp', []);

app.controller('serverCtrl', function($scope, $http, $interval) {

	$scope.name = "Akhil";
	$scope.lat = 18.5288963;
	$scope.lng = 73.87439059999997;
	console.log($scope.lat);




	// var map, GeoMarker;

	// function initialize() {
	// 	var mapOptions = {
	// 		zoom: 17,
	// 		center: new google.maps.LatLng($scope.lat, $scope.lng),
	// 		mapTypeId: google.maps.MapTypeId.ROADMAP
	// 	};
	// 	map = new google.maps.Map(document.getElementById('map_canvas'),
	// 		mapOptions);

	// 	GeoMarker = new GeolocationMarker(map);
	// 	GeoMarker.setCircleOptions({fillColor: '#808080'});
	//   // GeoMarker.setCircleOptions({fillColor: '#808080',position: {lat: $scope.lat, lng: $scope.lng},visble:true});
	//   GeoMarker.setMarkerOptions({position: {lat: $scope.lat, lng: $scope.lng}});


	//   google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
	//   	map.setCenter(this.getPosition());
	//   	map.fitBounds(this.getBounds());
	//   });

	//   google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
	//   	alert('There was an error obtaining your position. Message: ' + e.message);
	//   });

	//   // GeoMarker.setMap(map);
	// }


	$interval(function() {
		$http.get('../json/current_location_map.json').then(function(response) {
			$scope.location = response.data;
			console.log($scope.location);
			$scope.lat = $scope.location[0];
			$scope.lng = $scope.location[1];
		});

		// initialize();
	},5000);


	// google.maps.event.addDomListener(window, 'load', initialize);

	// if(!navigator.geolocation) {
	// 	alert('Your browser does not support geolocation');
	// }



});

app.directive('myMap', function() {
    // directive link function
    var link = function(scope, element, attrs) {
    	var map, infoWindow;
    	var markers = [];
    	
        // map config
        var mapOptions = {
        	center: new google.maps.LatLng(50, 2),
        	zoom: 4,
        	mapTypeId: google.maps.MapTypeId.ROADMAP,
        	scrollwheel: false
        };
        
        // init the map
        function initMap() {
        	if (map === void 0) {
        		map = new google.maps.Map(element[0], mapOptions);
        	}
        }    
        
        // place a marker
        function setMarker(map, position, title, content) {
        	var marker;
        	var markerOptions = {
        		position: position,
        		map: map,
        		title: title,
        		icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
        	};

        	marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array
            
            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                	infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                	content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }
        
        // show the map and place some markers
        initMap();
        
        setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
        setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
        setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
    };
    
    return {
    	restrict: 'A',
    	template: '<div id="gmaps"></div>',
    	replace: true,
    	link: link
    };
});

