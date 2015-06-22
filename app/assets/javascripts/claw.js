var claw = function() {

    var num = 0
    var balance = parseInt($('#coinDisplay h5').html().split(' ')[0])


    var lessCoins = function() {
      if ( num > 0 ) {
        num -= 1
        balance += 1
        $('#moveClawGrab').html(num)
        $('#coinDisplay h5').html(balance + " coins")
    }
    }

    var addCoins = function() {
      if ( num < CoinCap) {
        num += 1
        balance -= 1
        $('#moveClawGrab').html(num)
        $('#coinDisplay h5').html(balance + " coins")
    }
    }

    var clawDown = function(grabItem) {
        clowDown = TweenMax.to('#theClaw', 3, {
            top: '110%',
            onComplete: function() {
                $('#gameBox').append('<div id=' + grabItem + '></div>')
                item = grabItem
                grabGame(item);
            }
        });
    };

    var grabGame = function(item) {
        grabGame = TweenMax.to('#gameBox', 3, {
            top: '50px',
            onComplete: function() {
                voucher();
            }
        });
    };

    var renderItem = function() {
        voucher();
    }



    $('#moveClawGrab').click(function() {
        clawDown("RedemtionView")
    });

    $('#addCoins').click(function() {
        addCoins()
    });

    $('#lessCoins').click(function() {
        lessCoins()
    });


};







// $(document).ready(function() {
//     // Adapted from the following Processing example:
//     // http://processing.org/learning/topics/follow3.html

//     // The amount of points in the path:
//     var points = 25;

//     // The distance between the points:
//     var length = 35;

//     var path = new Path({
//         strokeColor: '#E4141B',
//         strokeWidth: 20,
//         strokeCap: 'round'
//     });

//     var start = view.center / [10, 1];
//     for (var i = 0; i < points; i++)
//         path.add(start + new Point(i * length, 0));

//     function onMouseMove(event) {
//         path.firstSegment.point = event.point;
//         for (var i = 0; i < points - 1; i++) {
//             var segment = path.segments[i];
//             var nextSegment = segment.next;
//             var vector = segment.point - nextSegment.point;
//             vector.length = length;
//             nextSegment.point = segment.point - vector;
//         }
//         path.smooth();
//     }

//     function onMouseDown(event) {
//         path.fullySelected = true;
//         path.strokeColor = '#e08285';
//     }

//     function onMouseUp(event) {
//         path.fullySelected = false;
//         path.strokeColor = '#e4141b';
//     }
// });
