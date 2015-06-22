
function getLocation() {
 
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(showPosition, showError);
         
        x = document.getElementById("look");

    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

}


function showPosition(position) {

   var lat = position.coords.latitude;
   var lng = position.coords.longitude

    

    x.innerHTML = "Latitude: " + lat + 
    "<br>Longitude: " + lng; 

  sendData(lat, lng);
  showMeMap(lat, lng);
  addMarkerToMap(lat, lng);
}


function sendData(lat, lng){

var numbers = lat.toString()+ "," + lng.toString();

  $.ajax({
        type: "POST",/*method type*/
        contentType: "application/json; charset=utf-8",
        url: "/search",
        data: '{"my_data":"' + numbers + '"}',
        dataType: "json"
  });
}