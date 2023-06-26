var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;
var highScore = 0;

$(document).on("keydown", function(){
  
  if (!gameStarted) {
    gameStarted = true;
    $("h1").text("LEVEL " + level);
    nextSequence();    
    }
});


$(".btn").on("click", function(event){
  userClickedPattern.push(event.target.id);
  playSound(event.target.id);
  animatePress(event.target.id);
  checkAnswer(userClickedPattern.length-1);
});



function nextSequence(){
  $("h1").text("LEVEL " + level);
  if (level>highScore){
    highScore = level;
    $("#high-score").text("High Score: " + level);
  }    
  userClickedPattern = [];
  var randomChosenColor = buttonColors[Math.floor(Math.random()*4)];
  
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  animatePress(randomChosenColor);

}

function playSound(colorPressed) {
  var colorSound = new Audio("./sounds/"+colorPressed+".mp3");
  colorSound.play();
}


function animatePress(colorPressed) {

  $("#"+colorPressed).toggleClass("pressed");
  setTimeout(function(){
    $("#"+colorPressed).toggleClass("pressed");
  },100);


}

function checkAnswer(lastPressedIndex){
  if (userClickedPattern[lastPressedIndex]!==gamePattern[lastPressedIndex]){
    playSound("wrong");
    $("body").toggleClass("game-over");
    setTimeout(function(){
      $("body").toggleClass("game-over");
    }, 200);
    $("h1").text("GAME OVER");
    startOver();
  } 
  if (lastPressedIndex===gamePattern.length-1){
    level++;
    setTimeout(nextSequence, 1000);
  }
}



function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
  level = 0;
  setTimeout(function(){
    $("h1").text("Press Any Key to Start");
  }, 1000);
}


//the logic:
//keep track of if game has been sgtarted, if not, any key to start and we will run nextSeq function
//in nextSeq, we add a color to computer pattern
//now we wait for a user to click button
//--> when button pressed, we add to user clicked pattern and check if it matches with the computer pattern at this index (will always be last index of the array)
//if not, start over, else we check if the full computer pattern has been completed by looking at the lengths
//if not, we wait on another click in which we repeat process, growing our user pattern and checking each most recent press that it is correct
//if so, we reset user generated pattern and rerun nextSeq function