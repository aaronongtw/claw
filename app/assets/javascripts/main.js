$(document).ready(function() {
  claw();

  if( $('#flappyFood').length ){  //if id exists runs flap game
        game.flappy();

    };

  console.log("starting document ready");
});