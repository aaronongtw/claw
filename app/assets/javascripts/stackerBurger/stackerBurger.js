
// Set variables and values for some (we set them outside of document ready so they are global)
var animation,
	generateAnimation,
	stackerGameComplete = false; 
	currentBottom = 33, 
	numElement = 0, 
	time = 1, 
	score = 0, 
	elementToBeScored = 0, 
	scorePosition = 0,
	left = 0,
	perfectWinningPosition = 0,
	clickCount = 0;


var firstStackCreation = function() {
	var $stack0 = $('<div class="stack" id="stack0"></div>');
		$stack0.appendTo('#stackerGame');
}


$(document).ready(function() {

	var startStackerGame = function() {
		firstStackCreation()
		left = parseInt( $("#stackerGame").css("width") ) - parseInt( $("#stack0").css("width") );
		perfectWinningPosition = left / 2;
			animation = TweenMax.to( "#stack0", time, {
			left: left, 
			yoyo: true, 
			repeat: -1, 
			ease: Linear.easeNone
			});
	};

	startStackerGame();




	generateAnimation = function () {
		if ( !stackerGameComplete ) {
			
			var height = $(".stack").css("height"); // Get the height from the .stack (this returns a NUMpx)
			currentBottom += parseInt(height); // Current bottom which is 0 at first, add the height (parseInt to get rid of px)
			numElement++; // Add 1 to numElement
			time = time - 0.1; // Reduce the amount of time
			var id = "stack" + numElement; // Generate an id

			// Create a div, give it the class stack, give it an id and change its bottom value
			var toAppend = $("<div />").addClass("stack").attr("id", id).css("bottom", currentBottom + "px");

			if ( numElement < 10 ) {
				$(".stack").last().after( toAppend ); // Get the last stack, and put the previously created element after it in the HTML
			}

			animation.kill(); // Stop the currently running animation

			//grabs the left position value of the last animated element. This will indicate how close the user got.
			scorePosition = (  parseInt( $("#stack" + (elementToBeScored++)).css("left") )  );
			console.log(scorePosition);

			// Animate the newly created div
			animation = TweenMax.to("#" + id, time, {
				left: left, 
				yoyo: true, 
				repeat: -1, 
				ease: Linear.easeNone
			});
		}
	};


	//generates score based off how close the user came to matching the winning position.
	var stackerScore = function() {

		if ( numElement <= 10 ) {

			if (scorePosition === perfectWinningPosition) {
				console.log("Perfect Hit!");
				score += 100;
			}
			else if ( Math.abs(scorePosition - perfectWinningPosition) <= 4) {
				console.log("oohhh close,, within 4"); 
				score += 90; 
			}
			else if ( Math.abs(scorePosition - perfectWinningPosition) <= 10) {
				console.log("close,, within 10"); 
				score += 50; 
			}
			else if ( Math.abs(scorePosition - perfectWinningPosition) <= 50) {
				console.log("not so close,, within 50"); 
				score += 25;
			}
			else if ( Math.abs(scorePosition - perfectWinningPosition) <= 100) {
				console.log("hmm not so close,, within 100"); 
				score += 10;
			}
			else {
				console.log("Too far,you get nothing!");
			}

		} 

		$('#stackerScoreTally').html("SCORE: " + score);
	};



	var finalStackerResult = function() {
		stackerGameComplete = true;

		$('#stackerScoreComplete').css('display','block');
		$('#stackerScoreComplete').html('You scored ' + score + ' points! <br> Rank: <br> High Score: <br><br> <button id="stackerReset">reset</button>');
	};



	var resetStackerGame = function() {
		var $stacksToBeCleared = $('.stack').length;
			for (var i = $stacksToBeCleared; i >= 0; i--) {
				$("#stack" + i).remove();
			}
		stackerGameComplete = false; 
		currentBottom = 33, 
		numElement = 0, 
		time = 1, 
		score = 0, 
		elementToBeScored = 0, 
		scorePosition = 0;
				$('#stackerScoreTally').html("SCORE: " + score);
		
		$('#stackerScoreComplete').css('display','none');
	};




	//click events to play game and reset
	$('body').on('click', "#stackerGame", function() {
		console.log(clickCount);
		clickCount += 1;
		if (clickCount <= 10) {
			generateAnimation();
			stackerScore();
		}
		else if (clickCount === 11) {
			finalStackerResult();
		}
		else {
			clickCount = 0;
			resetStackerGame();
			startStackerGame();
		}
	});


});

