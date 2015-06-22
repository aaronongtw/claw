$(document).ready(function() {

var fLRotation = 0
var fRotation = 0
var fishTimer
var scoreCount = 0

var moveWaves = function() {
	TweenMax.to('#waveOne', 1, {rotation:-10, yoyo:true, repeat:-1, ease:Linear.easeNone});
	TweenMax.to('#waveTwo', 1, {rotation:10, yoyo:true, repeat:-1, ease:Linear.easeNone});
}

moveWaves();



var spinFish = function() {
	fishTimer = (Math.random() * 5000) + 2000
	console.log (fishTimer)
	fLRotation -= 360
	fRotation -= 720
	fishLoop = TweenMax.to('#fishLoop', 5/*<--speed*/, {rotation:fLRotation,});
	fish = TweenMax.to('#fish', 2, {rotation:fRotation});
	clearTimeout(fishInterval)
	callSpinFish()
}

var callSpinFish = function(){
	fishInterval = setTimeout(function() {
	spinFish()
}, fishTimer
)}

var addToScore = function() {
	scoreCount +=1
	$('#scoreTally').html(scoreCount)
}

callSpinFish();

$('#fish').click(function(){
	console.log('score')
	addToScore();
})







});
