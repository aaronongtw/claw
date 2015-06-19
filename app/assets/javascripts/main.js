$(document).ready(function() {

  claw();

  if( $('#flapFood').length ){  //if id exists runs flap game
        game.flappy();
    };

  console.log("starting document ready");
});