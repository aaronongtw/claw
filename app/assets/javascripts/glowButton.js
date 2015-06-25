var stopTheGlow = function(){
  clearInterval(glowOn);
  $('#moveClawGrab').removeClass('glowButton');
  $('#moveClawGrab').addClass('clawBottomShadow');

}


var glowButton = function(){
      $('#moveClawGrab').removeClass('clawBottomShadow');

    setTimeout(function(){
      var timeMe = 0
      glowOn = setInterval( function(){
        timeMe +=1
        if(timeMe < 15){
          $('#moveClawGrab').toggleClass('glowButton');
        }else{
         stopTheGlow();
        }
      },2000);
    },1000);
};