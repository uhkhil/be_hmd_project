var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
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
			var camera = new THREE.PerspectiveCamera(62.2, 320/240, 1, 500 );
			camera.position.set(0, 0, 1);
			camera.lookAt(new THREE.Vector3(x_list[1], 9999999999999999999999999, 0));

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
				linewidth: 1,
				linecap: 'round', //ignored by WebGLRenderer
				linejoin:  'round' //ignored by WebGLRenderer

			});

			var line = new THREE.Line(geometry, material);

			scene.add(line);
			renderer.render(scene, camera);


		});
	};


	fetch();



});

