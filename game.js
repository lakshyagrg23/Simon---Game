var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keydown(function(){
    if (started === false){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function(){
    if (started === true){
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);

        $(this).fadeOut(100).fadeIn(100);
        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);

        // console.log(userClickedPattern);
        // console.log(gamePattern);
    }
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("success");
        if (userClickedPattern.length === level){
            setTimeout(nextSequence, 1000)
        }
    }
    else {
        // console.log("wrong");
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver()
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor((Math.random())*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    // animatePress(randomChosenColour);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name){
    var audioFile = "./sounds/" + name + ".mp3";
    var audio = new Audio(audioFile);
    audio.play(); 
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
