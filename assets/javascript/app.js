
var triviaArray = [
{
	question:"Where is Scotland?",
	answer1:"Eastern Europe",
	answer2:"Southern Europe",
	answer3:"Part of Scandnavia",
	answer4:"<span class='correctBtn'>Part of the United Kingdom",
	correct:"Part of the United Kingdom"
},
{
	question:"Which country spells whisky with an 'e'?",
	answer1:"Canada",
	answer2:"Japan",
	answer3:"<span class='correctBtn'>America",
	answer4:"Scotland",
	correct:"America"
},
{
	question:"",
	answer1:"",
	answer2:"",
	answer3:"",
	answer4:""
},
{
	question:"",
	answer1:"",
	answer2:"",
	answer3:"",
	answer4:""
},
{
	question:"",
	answer1:"",
	answer2:"",
	answer3:"",
	answer4:""
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
}

function correctAnswerSlide(){
	$(".question").html("<h2>Correct!!</h2>");
	buttonHide();
	stop();
}

function wrongAnswerSlide(){
	$(".question").html("<h2>Wrong!!</h2>");
	buttonHide();
	stop();
}

function nextSlide() {
	buttonShow();
	triviaSlide();
	addTrivia();
	timeyMcTimerFace = setInterval(countDown, 1000);
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
	clearInterval(timeyMcTimerFace);
	intervalNumber = 30;
	$(".timer").html(intervalNumber);
}

var timeyMcTimerFace = setInterval(countDown, 1000);

// start of game and subsequent slide changes
$(document).ready(function(){


	$(".game-start").show();
	$(".slide1").hide();

	$(".startBtn").on("click", function(){
		$(".game-start").hide();
		$(".slide1").show();
		triviaSlide();
		addTrivia();
		timeyMcTimerFace;
		
	});
	$(".btn").on("click", ".correctBtn", function(){
		playerGuessed = false;
		counter++;
		correctAnswerSlide();
		setInterval(nextSlide, 3000);
	});
});



