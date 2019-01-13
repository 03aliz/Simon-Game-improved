var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var userChosenColour;
var level = 0;



$(".btn").on("click", function () {
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playButtonSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keypress", function () {
  $("h1").html("Level " + level);
  nextSequence();
});

function nextSequence () {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playButtonSound(randomChosenColour);
  animatePress(randomChosenColour);
  level++;
  $("h1").html("Level " + level);
  sequenceFinished = true;
}

function checkAnswer(level) {
  if(userClickedPattern[level] === gamePattern[level]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } else {
    var wrongAnswer = new Audio("sounds/wrong.mp3");
    wrongAnswer.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    },200);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function animatePress (currentColour) {

  $("#" + currentColour).addClass("pressed");

setTimeout(function () {
  $("#" + currentColour).removeClass("pressed");
}, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

function playButtonSound(button) {
  switch (button) {
    case "green":
    var green = new Audio("sounds/green.mp3");
    green.play();
    break;

    case "red":
    var red = new Audio("sounds/red.mp3");
    red.play();
    break;

    case "yellow":
    var yellow = new Audio("sounds/yellow.mp3");
    yellow.play();
    break;

    case "blue":
    var blue = new Audio("sounds/blue.mp3");
    blue.play();
    break;

  }
}
