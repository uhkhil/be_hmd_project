function myMap() {

	setInterval(function () {
		console.log('it works' + new Date());


		$.getJSON("../json/current_location_map.json", function(json) {
            console.log(json[0]); // this will show the info it in firebug console
            var lat = json[0];
            var lng = json[1];


            var mapCanvas = document.getElementById("map");
            var myCenter = new google.maps.LatLng(lat,lng); 
            var mapOptions = {center: myCenter, zoom: 16};
            var map = new google.maps.Map(mapCanvas,mapOptions);
            var marker = new google.maps.Marker({
            	position: myCenter,
            	animation: google.maps.Animation.BOUNCE,
            	visible: true
            });
            marker.setMap(map);

        });

	},10000);
};