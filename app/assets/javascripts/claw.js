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

    var dropBox = function(){
      $('#gameBox').html('')
      game.endFish()
      $('#gameSelector').css('display','block')
      dropGameAn = TweenMax.to('#gameBox',0.3, {
        top: '110%',
        display: 'none'
      })
    }

    var grabGame = function(item) {
      callItem = item
        grabGameAn = TweenMax.to('#gameBox', 3, {
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
                renderSlide()
                game.slide()
                }
                else if (callItem === "redeem"){
                redeemList()
                }
            }
        });
    };

    var clawDown = function(grabItem) {
        $('#gameSelector').css('display','none')
        clowDownAn = TweenMax.to('#theClaw', 3, {
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
      clawUpAn = TweenMax.to('#theClaw', 2.5, {
        top: '0px'
      })
    }

    

    var renderFish = function() {
        $('#gameBox').append("<div id='fishGame'><h5 id='scoreTally'>SCORE</h5><div id='waveOne'></div><div id='waveTwo'></div><div id='fishLoop'><div id='fish'></div></div><div id='fish2'></div></div>")
    }

    var renderSlide = function() {
      $('#gameBox').append('<div id="stackerGame">  <h2 id="stackerScoreTally">SCORE:</h2><div id="stackerResults"><h5 id="stackerScoreComplete"></h5></div><div id="stackCentre"></div></div>')

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
    $('#dropBox').click(function() {
        dropBox()
    })
    $('#redeemDisplay').click(function() {
        clawDown("redeem")
    })

};