$(document).ready(function() {

    $('#moveClawLeft').mousedown(function() {
        moveLeft = setInterval(function() {
            hPos = parseInt($('#clawArm').css('left').split('p')[0])
            if (hPos > 10) {
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
            if (hPos < 1200) {
                hPos += 1
            }
            hPos += "px"
            hPos = hPos = $('#clawArm').css('left', hPos)
        }, 10)
        $(document).mouseup(function() {
            clearInterval(moveRight)
        });


    });

  //   var animateImage = function () {
  //   currentTween = TweenMax.to( '.image', 3, {
  //     backgroundColor: 'pink',
  //     left: '50%',
  //     top: '50%',
  //     width: 600,
  //     xPosition: '-50%',
  //     yPosition: '-50%',
  //     rotation: '1080',
  //     delay: 1,
  //     yoyo: true,
  //     repeat: -1,
  //     repeatDelay: 0.5,
  //     ease: Bounce.easeOut,
  //     onStart: function () {
  //       // console.log('Animation Started');
  //     },
  //     onUpdate: function () {
  //       // console.log('Animation updated');
  //     }
  //   });
  // };

    var clawDown = function() {
      clowDown = TweenMax.to('#clawArm', 3, {
        top:'640px',
        onComplete: function() {
          $('#clawArm').append('<div class="gameBox"></div>')
          clowDown.reverse();
          
        }
      })
    }

        

    $('#moveClawGrab').click(function() {
        clawDown()
      

    });

    
});
