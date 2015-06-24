var game = game || {}
var fishInterval
var miss = 0
game.fishing = function() {
	
	var fLRotation = 0
	var fRotation = 0
	var fishTimer
	var scoreCount = 0


	var moveWaves = function() {
		TweenMax.to('#waveOne', 1, {rotation:-12, yoyo:true, repeat:-1, ease:Linear.easeNone});
		TweenMax.to('#waveTwo', 1, {rotation:12, yoyo:true, repeat:-1, ease:Linear.easeNone});
	}

	moveWaves();

	var flyTaco = function() {
		flyingTaco = TweenMax.to('#fish2', 0.5, {
			top: '-10%',
			onComplete: function() {
				$('#fish2').css('top','110%')
			}
		})
	}
	

	var callSpinFish = function(){
		fishInterval = setTimeout(function() {
		spinFish()
    }, 
		((Math.random() * 4000) + 3000)
	)};


	var spinFish = function() {
		fishTimer = (Math.random() * (5000/(scoreCount + 1))) + (20000/(scoreCount+1))
		console.log (fishTimer)
		fLRotation -= 360
		fRotation -= 720
		fishLoop = TweenMax.to('#fishLoop', ((fishTimer/1000)+(10-(scoreCount*0.7))), {rotation:fLRotation,});
		fish = TweenMax.to('#fish', 5	, {rotation:fRotation});
		clearTimeout(fishInterval)
    
		callSpinFish()
	}

	spinFish()



	var addToScore = function() {
    if ($('#fish').position().top < 0){
 		scoreCount +=1
    flyTaco();
    }
    else {
    console.log('missed')
    miss += 1
    }
	}

	var requestRank = function() {
    var scoreData = {  
        game:{
            name: "Taco Fishing",
            highscore: scoreCount
        }

    };


    var fishResetGame = function() {
    	
    };

    $.ajax({
        url: '/game_rank',
        method: 'POST',
        data: scoreData

    }).done(function(data){

        console.log("recieved data: " + data);

        //show scoreboard and jquery funkyness code
    });
  }
	

	$('#catch').click(function(){
		addToScore();
	})

	$('#fishGame').click(function(){
		$('#scoreTally').html('score: ' + scoreCount + 'missed: ' + miss)
		if (miss === 5 ) {
			$('#fishGame').html('<h3>score: ' + scoreCount + '</h3><h3>missed: ' + miss + '</h3><h1>YOU LOSE</h1>' + '<button id="reset">reset</button>')
			$('#reset').click(function() {
				$('#gameBox').html('')
		    	$('#gameBox').append("<div id='fishGame'><h5 id='scoreTally'>SCORE</h5><div id='waveOne'></div><div id='waveTwo'></div><div id='fishLoop'><div id='fish'></div></div><div id='fish2'></div><div id='catch'></div></div>")
		    	miss = 0
		    	scoreCount = 0
		    	game.endFish()
		    	game.fishing()
			})
			game.endFish()
		}
	})

};

game.endFish = function() {
	clearTimeout(fishInterval)
};

