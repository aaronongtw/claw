


var claw = function() {



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

    var clawDown = function(grabItem) {
      clowDown = TweenMax.to('#clawArm', 3, {
        top:'110%',
        onComplete: function() {
          $('#gameBox').append('<div id=' + grabItem + '></div>')
          item = grabItem
          grabGame(item);
        }
      });
    };

    var grabGame = function(item) {
      grabGame = TweenMax.to('#gameBox',3, {
        top:'50px',
        onComplete: function() {
          renderGame();
        }
      });
    };

    var renderGame = function() {
      game.flappy();
    }

        

    $('#moveClawGrab').click(function() {
        clawDown("RedemtionView")
    });

    
};
