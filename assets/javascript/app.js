
var triviaArray = [
{
	question:"Where is Scotland?",
	answer1:"<span class='notBtn'>Eastern Europe",
	answer2:"<span class='notBtn'>Southern Europe",
	answer3:"<span class='correctBtn'>Part of the United Kingdom",
	answer4:"<span class='notBtn'>Part of Scandnavia"
},
{
	question:"Which country spells whisky with an 'e'?",
	answer1:"<span class='correctBtn'>America",
	answer2:"<span class='notBtn'>Japan",
	answer3:"<span class='notBtn'>Canada",
	answer4:"<span class='notBtn'>Scotland"
},
{
	question:"Which process is NOT part of making whisky?",
	answer1:"<span class='notBtn'>Malting",
	answer2:"<span class='notBtn'>Mashing",
	answer3:"<span class='notBtn'>Fermentation",
	answer4:"<span class='correctBtn'>All are processes"
},
{
	question:"Which is not a regional style of Scotch whisky?",
	answer1:"<span class='notBtn'>Highlands",
	answer2:"<span class='correctBtn'>Midlands",
	answer3:"<span class='notBtn'>Islay",
	answer4:"<span class='notBtn'>Speyside"
},
{
	question:"Why is older whisky more expensive?",
	answer1:"<span class='correctBtn'>Evaportation of the whisky leaves less whisky",
	answer2:"<span class='notBtn'>It tastes so darn good!",
	answer3:"<span class='notBtn'>Because  BevMo says so",
	answer4:"<span class='notBtn'>Scotish regulations say so"
},
]

var currentQuestion;
var currentOption1;
var currentOption2;
var currentOption3;
var currentOption4;
var playerGuessed = false;
var intervalNumber = 30;
var counter = 0;
var wrongPause;
var correctPause;
var correct = 0;
var wrong = 0;

function triviaSlide (){
	for(var i = counter; i<triviaArray.length; i++){
		if(playerGuessed == false) {
			currentQuestion = triviaArray[i].question;
			currentOption1 = triviaArray[i].answer1;
			currentOption2 = triviaArray[i].answer2;
			currentOption3 = triviaArray[i].answer3;
			currentOption4 = triviaArray[i].answer4;
			playerGuessed = true;
		}
	}
}

function addTrivia(){
	buttonShow();
	$(".question").html(currentQuestion)
	$(".option1").html(currentOption1)
	$(".option2").html(currentOption2)
	$(".option3").html(currentOption3)
	$(".option4").html(currentOption4)
	$(".option4").addClass("correctBtn");
}

function slideChange(){
	playerGuessed = false;
	counter++;
	buttonHide();
	stop();
}

function correctAnswerSlide(){
	$(".question").html("<h2>Correct!!</h2>");
	slideChange();
}

function wrongAnswerSlide(){
	$(".question").html("<h2>Wrong!!</h2>");
	slideChange();
}
function winnerSlide(){
	$(".question").html(
		"<h1>You Win!!!!</h1>" +
		"<p>Answered Correctly: " + correct + "</p>" +
		"<p>Answered Incorrectly: " + wrong + "</p>" 
		);
}
function loserSlide(){
	$(".question").html(
		"<h1>You lack winning skills</h1>" +
		"<p>Answered Correctly: " + correct + "</p>" +
		"<p>Answered Incorrectly: " + wrong + "</p>" 
		);
}

function nextSlide() {
	if(counter < triviaArray.length) {
		buttonShow();
		triviaSlide();
		addTrivia();
		stop();
		timeyMcTimerFace = setInterval(countDown, 1000);
	}
	else if(counter == triviaArray.length && correct > wrong){
		winnerSlide();
	}
	else if(counter == triviaArray.length && correct < wrong){
		loserSlide();
	}
}

function buttonHide(){
	$(".option1").hide();
	$(".option2").hide();
	$(".option3").hide();
	$(".option4").hide();
}

function buttonShow(){
	$(".option1").show();
	$(".option2").show();
	$(".option3").show();
	$(".option4").show();
}

// Clock Countdown functions
function countDown(){
	intervalNumber--;
	$(".timer").html(intervalNumber);
	if(intervalNumber == 0) {
		stop();
	}
}

function stop(){
	clearInterval(wrongPause);
	clearInterval(correctPause);
	clearInterval(timeyMcTimerFace);
	timeyMcTimerFace = undefined;
	intervalNumber = 30;
	$(".timer").html(intervalNumber);
}

var timeyMcTimerFace;

// function endGame(){
// 	if(counter == triviaArray.length) {
// 		stop();
// 		console.log("game is done.");
// 	}
// }

// start of game and subsequent slide changes
$(document).ready(function(){

	$(".game-start").show();
	$(".slide1").hide();
	// $(".endOfGame").hide();

	$(".startBtn").on("click", function(){
		$(".game-start").hide();
		$(".slide1").show();
		triviaSlide();
		addTrivia();
		clearInterval(timeyMcTimerFace);
		timeyMcTimerFace = setInterval(countDown,1000);
		
	});
	$(".btn").on("click", ".correctBtn", function(){
		correct++;
		correctAnswerSlide();
		correctPause = setInterval(nextSlide, 3000);
	});

	$(".btn").on("click", ".notBtn", function(){
		wrong++;
		wrongAnswerSlide();
		wrongPause = setInterval(nextSlide, 3000);
	});

});


