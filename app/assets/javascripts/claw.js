$(document).ready(function() {

    $('#moveClawLeft').mousedown(function() {
        moveLeft = setInterval(function() {
            hPos = parseInt($('#clawArm').css('left').split('p')[0])
            if (hPos > 32) {
                hPos -= 1

            }
            hPos += "px"
            hPos = hPos = $('#clawArm').css('left', hPos)
        }, 10)
        $(document).mouseup(function() {
            clearInterval(moveLeft)
        });
    });
    $('#moveClawRight').mousedown(function() {
        moveRight = setInterval(function() {
            hPos = parseInt($('#clawArm').css('left').split('p')[0])
            if (hPos < 275) {
                hPos += 1
            }
            hPos += "px"
            hPos = hPos = $('#clawArm').css('left', hPos)
        }, 10)
        $(document).mouseup(function() {
            clearInterval(moveRight)
        });


    });
    $('#moveClawGrab').click(function() {
      console.log('la')
      var claw = $('#clawArm')
        clawGrab = TweenLite.set(claw, 3, {
          height:'500px'
        });
        clawGrab


    });


    if $('#flappyFood'){
        app.flappy();
    }
    
});
