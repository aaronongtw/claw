var drawLine;
var prizeUp;

var claw = function() {

    var num = 0

    var xMovement;

    var randomMovement = function() {
        xMovement = Math.floor((Math.random() * 10)- 20)
    }


    drawLine = function() {

        startX = ($(window).width() / 2) + 'px'
        startY = 0 + 'px'
        endX = $('#theClaw').position().left + ($('#theClaw').width() / 2) + 'px'
        endY = ($('#theClaw').position().top + 10) + 'px'
        $('#clawString').css({
            'top': startY,
            'left': endX,
            'height': endY
        })
    }

    var dropBox = function() {
        $('#gameBox').html('')
        game.endFish()
        $('#gameSelector').css('display', 'block')
        dropGameAn = TweenMax.to('#gameBox', 0.3, {
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
                clearInterval(drawingLine)
                if (callItem === "flappyFood") {
                    game.flappy()
                } else if (callItem === "bean") {
                    game.beans()   
                } else if (callItem === "taco") {
                    renderFish()
                    game.fishing()
                } else if (callItem === "slide") {
                    renderSlide()
                    game.slide()
                } else if (callItem === "redeem") {
                    redeemList()
                }
            }
        });
    };

    var grabPrize = function() {
        console.log('Grabbing Prize')
        
        prizeUp()
    }

    var prizeUp = function() {    
        grabbingPrize = TweenMax.to('#prizeBox', 2.2, {
            'display' : 'block',
            top: '30px',
            left: '10px',
            onComplete: function() {
                dropPrize = TweenMax.to('#prizeBox', 0.3, {
                    top: '130%',
                    onComplete: function() {
                        clearInterval(drawingLine)
                        $('#prizeBox').css({
                            'display':'none',
                            'top': '130%',
                            'left': '50%'
                        })
                        $('#prizeBox').html('')
                        num = 0
                        $('#moveClawGrab').html(num)
                        dropBox()
                    }

                })

            }
        })

    }

    var clawDown = function(grabItem) {
        drawingLine = setInterval(drawLine,10)
        $('#gameSelector').css('display', 'none')
        $('#gameBox').html('')
        clowDownAn = TweenMax.to('#theClaw', 3, {
            left: +xMovement,
            top: '95%',
            onComplete: function() {
                $('#gameBox').append('<div id=' + grabItem + '></div>')
                item = grabItem
                if (grabItem === "RedemtionView") {
                clawSide()
                grabPrize()
                }else {
                clawUp();
                grabGame(item);
                }
            }

        });
    };

    var clawUp = function() {
        clawUpAn = TweenMax.to('#theClaw', 2.5, {
            left: -xMovement,
            top: '0px'
        })
    }

    var clawSide = function() {
        clawUpAn = TweenMax.to('#theClaw', 2.5, {
            left: '10px',
            top: '0px',
            onComplete: function() {
                clawReturn = TweenMax.to('#theClaw',4, {
                    left: '50%'
                })
            }
        })
    }



    var renderFish = function() {
        $('#gameBox').append("<div id='fishGame'><h5 id='scoreTally'>SCORE</h5><div id='waveOne'></div><div id='waveTwo'></div><div id='fishLoop'><div id='fish'></div></div><div id='fish2'></div><div id='catch'></div></div>")
    }

    var renderSlide = function() {
        $('#gameBox').append('<div id="stackerGame">  <h2 id="stackerScoreTally">SCORE:</h2><div id="stackerResults"><h5 id="stackerScoreComplete"></h5></div><div id="stackCentre"></div></div>')

    }




    $('#moveClawGrab').click(function() {
        dropBox()
        clawDown("RedemtionView");
        whereAmI(); //updates user location with GPS
        voucher();
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
    $('#Bean').click(function() {
        clawDown("bean")
    });
    $('#dropBox').click(function() {
        dropBox()
    })
    $('#redeemDisplay').click(function() {
        dropBox()
        clawDown("redeem")
    })

};
