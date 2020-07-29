var buttonColor = ["red","green","blue","yellow"];
var gamePattern = [];
var userClick = [];
var start = false;
var i = 1;

$(document).keydown(function() {
    if(!start){
        nextSquence();
        start = true;
    }
});

userInput();

function press(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed"),100});
    }

function nextSquence(){
    userClick=[];
    $("#level-title").text("Level " + i);
    i++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var sounds = new Audio("sounds/"+ name + ".mp3");
    sounds.play();
}

function userInput(){
    $(".btn").click(function(){
        var buttonId = $(this).attr("id");
        userClick.push(buttonId);
        playSound(buttonId);
        press(buttonId);
        answerCheck(userClick.length-1);
    })
}

function answerCheck(currentLevel){
    if (userClick[currentLevel] === gamePattern[currentLevel]){
        if (userClick.length === gamePattern.length){
            setTimeout(function(){
                nextSquence()
            },1000);
        } 
    } else {
        gameOver();
    }
}

function gameOver(){
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press any button !");
    setTimeout(function(){
        $("body").removeClass("game-over")
    },200);
    restart();
}

function restart() {
    i = 1;
    gamePattern = [];
    start = false;
}