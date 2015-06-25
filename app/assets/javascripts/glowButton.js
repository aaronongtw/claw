var glowButton = function(){
      var timeMe = 0
      glowOn = setInterval( function(){
        timeMe +=1
        if(timeMe < 15){
          $('#moveClawGrab').toggleClass('glowButton');
        }else{
         clearInterval(glowOn);
        }
      },2000);

};