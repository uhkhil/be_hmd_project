var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http, $interval) {
	// $scope.look_x = 0;
	// $scope.look_y = 0;
	// $scope.look_z = 0;
	$scope.roll = 0;
	$scope.pitch = 0;
	$scope.yaw = 0;
	$scope.pos_x = 0;
	$scope.pos_y = 0;
	$scope.pos_z = 1;
	var x_list;
	$scope.fetched_data = []
	var fetch = function (end) {
		$http.get('json/overlay.json').then(function (response) {
			$scope.fetched_data = response.data;
			console.log($scope.fetched_data);

			var x_list = $scope.fetched_data[0];
			var y_list = $scope.fetched_data[1];
			var z_list = $scope.fetched_data[2];

			//  Three JS Script

			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera(62.2, 320/240, 1, 5000 );

			var renderer = new THREE.WebGLRenderer({ alpha: true });
			renderer.setClearColor( 0xffffff, 0);
			renderer.setSize( 320, 240 );

			document.getElementById('canvas').appendChild( renderer.domElement );

			var geometry = new THREE.Geometry();

			for (var i = 0; i < x_list.length; i++) {
				geometry.vertices.push(new THREE.Vector3(x_list[i], y_list[i], z_list[i]));
			}

			var material = new THREE.LineBasicMaterial({ 
				color: 0x32cd32 ,
				linewidth: 10,
				linecap: 'round', //ignored by WebGLRenderer
				linejoin:  'round' //ignored by WebGLRenderer
			});

			var line = new THREE.Line(geometry, material);

			scene.add(line);

			var fetch_current_position = function () {

				$interval(function() {

					$http.get('json/current_location_x.json').then(function(response) {
						$scope.current_location = response.data;
						console.log($scope.current_location);


						var fetch_orientation = function () {
							
							$http.get('json/current_orientation.json').then(function(response) {
								$scope.current_orientation = response.data;
								console.log($scope.current_orientation);
								camera.position.set($scope.pos_x , $scope.pos_y , $scope.pos_z);
								// camera.lookAt(new THREE.Vector3($scope.look_x, $scope.look_y, $scope.look_z));
								// Uncomment next 3 lines and comment the 3 lines after that for using the sliders
								camera.rotation.x = $scope.roll;
								camera.rotation.y = -$scope.pitch;
								camera.rotation.z = $scope.yaw;
								// camera.rotation.x = $scope.current_orientation[0];
								// camera.rotation.y = -$scope.current_orientation[2];
								// camera.rotation.z = $scope.current_orientation[1];
								renderer.render(scene, camera);
							});

						}; // fetch_orintation() ends here

						fetch_orientation();

						

					}); // $http.get().then() ends here


				},1); // $interval ends here


			}; // fetch_current_position ends here


			fetch_current_position();


		}); // $http.get().then() ends here


	}; // fetch() ends here


	fetch();

}); // controller ends here