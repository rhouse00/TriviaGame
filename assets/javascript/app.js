var currentQuestion;
var currentOption1;
var currentOption2;
var currentOption3;
var currentOption4;
var currentAnswer;
var timeyMcTimerFace;
var slidePause;
var playerGuessed = false;
var intervalNumber = 30;
var counter = 0;
var correct = 0;
var wrong = 0;

var triviaArray = [
{
	question:"Where is Scotland?",
	answer1:"<span class='notBtn'>Eastern Europe",
	answer2:"<span class='notBtn'>Southern Europe",
	answer3:"<span class='correctBtn'>Part of the United Kingdom",
	answer4:"<span class='notBtn'>Part of Scandnavia",
	answerCorrect: "Part of the United Kingdom"
},
{
	question:"Which country spells whisky with an 'e'?",
	answer1:"<span class='correctBtn'>America",
	answer2:"<span class='notBtn'>Japan",
	answer3:"<span class='notBtn'>Canada",
	answer4:"<span class='notBtn'>Scotland",
	answerCorrect: "America"
},
{
	question:"Which process is NOT part of making whisky?",
	answer1:"<span class='notBtn'>Malting",
	answer2:"<span class='notBtn'>Mashing",
	answer3:"<span class='notBtn'>Fermentation",
	answer4:"<span class='correctBtn'>All are processes",
	answerCorrect: "All are processes"
},
{
	question:"Which is not a regional style of Scotch whisky?",
	answer1:"<span class='notBtn'>Highlands",
	answer2:"<span class='correctBtn'>Midlands",
	answer3:"<span class='notBtn'>Islay",
	answer4:"<span class='notBtn'>Speyside",
	answerCorrect: "Midlands"
},
{
	question:"Why is older whisky more expensive?",
	answer1:"<span class='correctBtn'>Evaportation of the whisky leaves less whisky",
	answer2:"<span class='notBtn'>It tastes so darn good!",
	answer3:"<span class='notBtn'>Because  BevMo says so",
	answer4:"<span class='notBtn'>Scotish regulations say so",
	answerCorrect: "Evaportation of the whisky leaves less whisky"
},
];

// Adds info to variables
function triviaSlide (){
	for(var i = counter; i<triviaArray.length; i++){
		if(playerGuessed == false) {
			currentQuestion = triviaArray[i].question;
			currentOption1 = triviaArray[i].answer1;
			currentOption2 = triviaArray[i].answer2;
			currentOption3 = triviaArray[i].answer3;
			currentOption4 = triviaArray[i].answer4;
			currentAnswer = triviaArray[i].answerCorrect;
			playerGuessed = true;
		}
		
	}
}

//Puts variables into the html
function addTrivia(){
	buttonShow();
	$(".question").html(currentQuestion)
	$(".option1").html(currentOption1)
	$(".option2").html(currentOption2)
	$(".option3").html(currentOption3)
	$(".option4").html(currentOption4)
}

function correctAnswerSlide(){
	$(".question").html("<h2>Correct!!</h2>");
	slideChange();
}

function wrongAnswerSlide(){
	$(".question").html("<h2>Wrong!!</h2>" + "<p>Answer is: " + currentAnswer + "</p>");
	slideChange();
}

function slideChange(){
	playerGuessed = false;
	counter++;
	buttonHide();
	intervalClearing();
}

function nextSlide() {
	if(counter < triviaArray.length) {
		buttonShow();
		triviaSlide();
		addTrivia();
		intervalClearing();
		timeyMcTimerFace = setInterval(countDown, 1000);
	}
	else if(counter == triviaArray.length && correct > wrong){
		$(".slide1").hide();
		winnerSlide();
		// slidePause = setInterval(newGame, 3000);
	}
	else if(counter == triviaArray.length && correct < wrong){
		$(".slide1").hide();
		loserSlide();
		// slidePause = setInterval(newGame, 3000);
	}
}

//End of game slides
function winnerSlide(){
	$(".endOfGame").show();
	$(".endOfGame").html(
		"<h1>You Win!!!!</h1>" +
		"<p>Answered Correctly: " + correct + "</p>" +
		"<p>Answered Incorrectly: " + wrong + "</p>" 
		);
}
function loserSlide(){
	$(".endOfGame").show();
	$(".endOfGame").html(
		"<h1>You lack winning</h1>" +
		"<p>Answered Correctly: " + correct + "</p>" +
		"<p>Answered Incorrectly: " + wrong + "</p>" 
		);
}


// Hide or Show Buttons when transitioning to answer slides
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
		intervalClearing();
	}
}
function intervalClearing(){
	clearInterval(slidePause);
	clearInterval(timeyMcTimerFace);
	slidePause = undefined;
	timeyMcTimerFace = undefined;
	intervalNumber = 30;
	$(".timer").html(intervalNumber);
}

// End Game Resetting not working yet...in beta

// function newGame() {
// 	intervalClearing();
// 	counter = 0;
// 	correct = 0;
// 	wrong = 0;
// 	playerGuessed = false;
// 	intervalNumber = 30;
// 	$(".game-start").show();
// 	$(".endOfGame").hide();
// }


// start of game and subsequent slide changes
$(document).ready(function(){

	$(".slide1").hide();
	$(".endOfGame").hide();

	$(".startBtn").on("click", function(){
		$(".game-start").hide();
		$(".slide1").show();
		clearInterval(slidePause);
		triviaSlide();
		addTrivia();
		timeyMcTimerFace = setInterval(countDown,1000);
	});

	$(".btn").on("click", ".correctBtn", function(){
		correct++;
		correctAnswerSlide();
		slidePause = setInterval(nextSlide, 3000);
	});

	$(".btn").on("click", ".notBtn", function(){
		wrong++;
		wrongAnswerSlide();
		slidePause = setInterval(nextSlide, 3000);
	});

});


