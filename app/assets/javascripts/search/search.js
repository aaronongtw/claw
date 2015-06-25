//needs to be run after user has logged in

function whereAmI() {
    getLocation();

    function getLocation() {
        console.log("inside get location");
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }

    }

    function showPosition(position) {

        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        sendData(lat, lng);
    }

    function sendData(lat, lng) {
        console.log("sending: " + lat + " and " + lng);
        var userLocation = {  
                user:{
                    lat: lat,
                    lon: lng
                }

            };

            $.ajax({
                url: '/geolocation',
                method: 'POST',
                data: userLocation
            }).done(function(data){
              console.log(data);
            });

    }

    function showError(error) {
      switch(error.code) {
          case error.PERMISSION_DENIED:
              console.log("User denied the request for Geolocation.")
              break;
          case error.POSITION_UNAVAILABLE:
              console.log("Location information is unavailable.")
              break;
          case error.TIMEOUT:
              console.log("The request to get user location timed out.")
              break;
          case error.UNKNOWN_ERROR:
              console.log("An unknown error occurred.")
              break;
      }
    }

}
