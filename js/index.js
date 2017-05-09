var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http, $interval) {
	$scope.look_x = 0;
	$scope.look_y = 0;
	$scope.look_z = 0;
	$scope.pos_x = 0;
	$scope.pos_y = 0;
	$scope.pos_z = 500;
	$scope.name = 'Akhil';
	var x_list;
	$scope.fetched_data = []
	console.log($scope.fetched_data);
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

						camera.position.set($scope.pos_x , $scope.pos_y , $scope.pos_z);
						camera.lookAt(new THREE.Vector3($scope.look_x, $scope.look_y, $scope.look_z));
						
						renderer.render(scene, camera);

					});


				},1);


			};

			fetch_current_position();

		});
	};


	fetch();



});

