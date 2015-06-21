$(document).ready(function() {
    claw();

    if ($('#flappyFood').length) { //if id exists runs flap game
        game.flappy();

    };
    var div = $('.gameSelect');
    var width = div.width();

    div.css('height', width);

    console.log("starting document ready");
});
