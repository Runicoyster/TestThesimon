let buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

document.addEventListener("keydown", function() {
    if (!started) {
        document.querySelector("h1").textContent = "Nível " + level;
        nextSequence();
        started = true;
    }
});

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function() {
        let userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);

        makeSound(userChosenColor);
        makeAnimation(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    });
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("h1").textContent = "Nível " + level;

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    makeAnimation(randomChosenColor);
    makeSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        makeSound("wrong");
        document.body.classList.add("game-over");
        document.querySelector("h1").textContent = "Game Over, Pressione Qualquer Tecla para Reiniciar";

        setTimeout(() => document.body.classList.remove("game-over"), 200);
        startOver();
    }
}

function makeSound(color) {
    let audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}

function makeAnimation(color) {
    let activeButton = document.querySelector("#" + color);
    activeButton.classList.add("selected");
    setTimeout(() => activeButton.classList.remove("selected"), 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}