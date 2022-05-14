var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

function playSound(name){
    switch (name) {
        case "green":
                var greenAudio = new Audio("sounds/green.mp3");
                greenAudio.play();
            break;
        case "red":
                var redAudio = new Audio("sounds/red.mp3");
                redAudio.play();
        break;
        case "yellow":
                var yellowAudio = new Audio("sounds/yellow.mp3");
                yellowAudio.play();
        break;
        case "blue":
                var blueAudio = new Audio("sounds/blue.mp3");
                blueAudio.play();
        break;
        default:
            break;
    }
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
}

function nextSequence(){
    var randomNumbers = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumbers];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;

    $("h1").text("Level " + level);
}

var userChosenColor;

$(".btn").click(function(){
    userChosenColor = this.id;

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    
    animatePress(userChosenColor);

    setTimeout(function(){
        $("#" + userChosenColor).removeClass("pressed");
    }, 100)

        checkAnswer(level);
});

$(document).one("keypress", function(){
    nextSequence();
})

function checkAnswer(currentLevel){
    for (var i = 0; i < userClickedPattern.length; i++){
    
        if (userClickedPattern.length === gamePattern.length && gamePattern[currentLevel-1] === userClickedPattern[currentLevel-1]){
            userClickedPattern.length = 0;
            setTimeout(nextSequence, 1000);
        }
        else if (gamePattern[i] === userClickedPattern[i]){
           console.log("Success!");
        }
        else {
           var wrongAudio = new Audio("sounds/wrong.mp3");
           wrongAudio.play();

           $("body").addClass("game-over");

           setTimeout(function(){
               $("body").removeClass("game-over");
           }, 200);

           startOver();
        }
    }
}

function startOver(){
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    level = 0;

    $("h1").text("Game Over, Press Any Key to Restart");

    $(document).one("keypress", function(){
        nextSequence();
    })
}