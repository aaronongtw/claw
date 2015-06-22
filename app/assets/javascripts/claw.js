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
            top: '95%',
            onComplete: function() {
                $('#gameBox').append('<div id=' + grabItem + '></div>')
                item = grabItem
                grabGame(item);
                clawUp();
            }
        });
    };

    var clawUp = function() {
      clawUp = TweenMax.to('#theClaw', 2.5, {
        top: '0px'
      })
    }

    var grabGame = function(item) {
      callItem = item
        grabGame = TweenMax.to('#gameBox', 3, {
            top: '30px',
            display: 'block',
            onComplete: function() {
              if (callItem === "RedemtionView"){
                voucher();
                }
                else if (callItem === "flappyFood"){
                game.flappy()
                }
                else if (callItem === "taco"){
                renderFish()
                game.fishing()
                }
                else if (callItem === "slide"){
                game.slide()
                }
            }
        });
    };

    var renderFish = function() {
        $('#gameBox').append("<div id='fishGame'><h5 id='scoreTally'>SCORE</h5><div id='waveOne'></div><div id='waveTwo'></div><div id='fishLoop'><div id='fish'></div></div></div>")
    }



    $('#moveClawGrab').click(function() {
        clawDown("RedemtionView");
        whereAmI(); //updates user location with GPS
    });

    $('#addCoins').click(function() {
        addCoins()
    });

    $('#lessCoins').click(function() {
        lessCoins()
    });

    $('#Fluffy').click(function() {
        clawDown("flappyFood")
    });
    $('#Taco').click(function() {
        clawDown("taco")
    });
    $('#Slide').click(function() {
        clawDown("slide")
    });

};