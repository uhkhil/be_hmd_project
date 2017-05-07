var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
	$scope.name = 'Akhil';
	var x_list;
	$scope.fetched_data = []
	var fetch = function (end) {
		$http.get('overlay.json').then(function (response) {
			$scope.fetched_data = response.data;
			console.log($scope.fetched_data);
		});
	};
	fetch();

	// var x_list = $scope.fetched_data[0];
	console.log(x_list);


	//  Three JS Script

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(62.2, 320/240, 1, 500 );
	camera.position.set(0, 0, 1);
	camera.lookAt(new THREE.Vector3(1.42108547152e-14, 9999999999999999999999999, 0));

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( 320, 240 );
	document.body.appendChild( renderer.domElement );

	var geometry = new THREE.Geometry();

	//  Static for now
	geometry.vertices.push(new THREE.Vector3(-0.0, 0.0, 0));
	geometry.vertices.push(new THREE.Vector3(1.42108547152e-14, 110.676427262, 0));
	geometry.vertices.push(new THREE.Vector3(-45.7755119438, 111.709858516, 0));
	geometry.vertices.push(new THREE.Vector3(-74.6329347621, -250.716237467, 0));
	geometry.vertices.push(new THREE.Vector3(119.880899946, -304.816317957, 0));
	geometry.vertices.push(new THREE.Vector3(990.463373795, -554.958054693, 0));
	geometry.vertices.push(new THREE.Vector3(1107.14702278, 928.086218028, 0));
	geometry.vertices.push(new THREE.Vector3(1094.25600333, 1061.58065606, 0));
	geometry.vertices.push(new THREE.Vector3(1123.02755904, 1066.89246657, 0));
	geometry.vertices.push(new THREE.Vector3(1494.48363743, 1216.92388097, 0));
	geometry.vertices.push(new THREE.Vector3(1561.54437057, 1118.58384984, 0));
	geometry.vertices.push(new THREE.Vector3(2586.63684901, 680.897826554, 0));
	geometry.vertices.push(new THREE.Vector3(2650.53419715, 705.215002065, 0));
	geometry.vertices.push(new THREE.Vector3(2636.34977013, 775.777897918, 0));



	var material = new THREE.LineBasicMaterial({ 
		color: 0x0000ff ,
		linewidth: 1,
		linecap: 'round', //ignored by WebGLRenderer
		linejoin:  'round' //ignored by WebGLRenderer

	});

	var line = new THREE.Line(geometry, material);

	scene.add(line);
	renderer.render(scene, camera);



});

