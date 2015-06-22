


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
      clowDown = TweenMax.to('#theClaw', 3, {
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
          renderItem();
        }
      });
    };

    var renderItem = function() {
      game.flappy();
    }

        

    $('#moveClawGrab').click(function() {
        clawDown("RedemtionView")
    });

    
};







$(document).ready(function() {
// Adapted from the following Processing example:
// http://processing.org/learning/topics/follow3.html

// The amount of points in the path:
var points = 25;

// The distance between the points:
var length = 35;

var path = new Path({
  strokeColor: '#E4141B',
  strokeWidth: 20,
  strokeCap: 'round'
});

var start = view.center / [10, 1];
for (var i = 0; i < points; i++)
  path.add(start + new Point(i * length, 0));

function onMouseMove(event) {
  path.firstSegment.point = event.point;
  for (var i = 0; i < points - 1; i++) {
    var segment = path.segments[i];
    var nextSegment = segment.next;
    var vector = segment.point - nextSegment.point;
    vector.length = length;
    nextSegment.point = segment.point - vector;
  }
  path.smooth();
}

function onMouseDown(event) {
  path.fullySelected = true;
  path.strokeColor = '#e08285';
}

function onMouseUp(event) {
  path.fullySelected = false;
  path.strokeColor = '#e4141b';
}
});