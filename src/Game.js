canvas = document.getElementById("gameCanvas");
ctx = canvas.getContext("2d");
//Variables
let animate = true;
let screen = "menu";
let score = 0;
let highScore = 0;

//Images and sounds
const gameMap = new Image(); //game map image
gameMap.src = "images/gameMap.png";

const bearIMG = new Image(); //bear image
bearIMG.src = 'images/bear.png';

const grizzlyStart = new Image(); //start screen
grizzlyStart.src = "images/grizzlyStart.png";

const levelFailed = new Image(); //game over screen
levelFailed.src = "images/levelFailed.jpeg";

const levelSuccessful = new Image(); //win screen
levelSuccessful.src = "images/levelSuccessful.jpeg";

const goodbye = new Image(); //goodbye screen
goodbye.src = "images/goodbye.jpeg";

const jump = new Audio("audio/jump.wav"); //jump sound effect

const button = new Audio("audio/button.wav"); //button sound effect

const loseSound = new Audio("audio/gameLoss.wav"); //game loss sound effect

const winSound = new Audio("audio/gameWin.wav");

highScore = localStorage.getItem("highScore");

//functions
function freeze(secs) { //freezes the screen for a set amount of time
    const waitUntil = performance.now() + secs * 1000;
    while (performance.now() < waitUntil) ;
}

function reset() { //resets the game
    //player
    player.reset();

    //enemy
    enemies = [];
    enemies.push(new Enemy());
    score = 0;
    min = 3500;
    max = 7000;
}

//event listener for menus
canvas.addEventListener("click", function (event) {  //start menu buttons
    if (screen === "menu") { //menu
        if (event.offsetX > 170 && event.offsetX < 315 && event.offsetY > 343 && event.offsetY < 406) {
            button.play();
            screen = "game";
        } else if (event.offsetX > 184 && event.offsetX < 304 && event.offsetY > 435 && event.offsetY < 509) {
            button.play();
            screen = "goodbye";
        }
    }
    if (screen === "gameOver") { //loss screen
        if (event.offsetX > 114 && event.offsetX < 331 && event.offsetY > 355 && event.offsetY < 432) {
            button.play();
            screen = "game";
            reset();
        } else if (event.offsetX > 160 && event.offsetX < 280 && event.offsetY > 450 && event.offsetY < 520) {
            button.play();
            screen = "goodbye";
        }
    }
    if (screen === 'gameWon') { //win screen
        if (event.offsetX > 164 && event.offsetX < 281 && event.offsetY > 393 && event.offsetY < 457) {
            button.play();
            screen = "goodbye";
        } else if (event.offsetX > 164 && event.offsetX < 282 && event.offsetY > 466 && event.offsetY < 518) {
            button.play();
            screen = "game";
            reset();
        }
    }
});

//Game Loop
function gameLoop() {
    if (animate === true) draw();
    requestAnimationFrame(gameLoop);
}

function draw() { //controls which screen is being shown
    if (screen === "menu") {
        drawMenu();
        document.getElementById("scoreBoard").innerHTML = "High score: " + highScore;
    } else if (screen === "game") {
        drawGame();
    } else if (screen === "gameOver") {
        drawGameOver();
        document.getElementById("scoreBoard").innerHTML = "High score: " + highScore;
    } else if (screen === "gameWon") {
        drawWin();
        document.getElementById("scoreBoard").innerHTML = "High score: " + highScore;
    } else if (screen === "goodbye")
        drawGoodbye();
}

gameLoop();

//draw screens functions
function drawMenu() { //main menu
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(grizzlyStart, 0, 0, canvas.width, canvas.height);
}

function drawGame() { //runs the game (draw background, update play, and enemy)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gameMap, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(bearIMG, 340, 100, 80, 60);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 350, 20);

    player.update();
    beeUpdater();
}

function drawGameOver() { //draws game over screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(levelFailed, 0, 0, canvas.width, canvas.height);
}

function drawWin() { //draws win screen and updates high score if needed
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(levelSuccessful, 0, 0, canvas.width, canvas.height);
    if (score > highScore || highScore === undefined) {
        highScore = score;
        alert("New High Score!");
        localStorage.setItem("highScore", highScore);
    }

}

function drawGoodbye() { //draws ending screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(goodbye, 0, 0, canvas.width, canvas.height);
}