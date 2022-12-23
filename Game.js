canvas = document.getElementById("gameCanvas");
ctx = canvas.getContext("2d");

//Variables
let animate = true;
let screen = "menu";

//Images
const gameMap = new Image(); //game map image
gameMap.src = "images/gameMap.png";

const bearIMG = new Image(); //bear image
bearIMG.src = 'images/bear.png';

const GrizzlyStart = new Image(); //start screen
GrizzlyStart.src = "images/GrizzlyStart.png";

const LevelFailed = new Image(); //game over screen
LevelFailed.src = "images/LevelFailed.png";

const LevelSuccessful = new Image(); //win screen
LevelSuccessful.src = "images/LevelSuccessful.png";

const Goodbye = new Image(); //goodbye screen
Goodbye.src = "images/Goodbye.jpeg";

//event listeners
canvas.addEventListener("click", function (event) {  //start game on button click
    if (screen === "menu") {
        if (event.offsetX > 170 && event.offsetX < 315 && event.offsetY > 343 && event.offsetY < 406) {
            screen = "game";
        }
    }
});

canvas.addEventListener("click", function (event) {  //Goodbye screen on button click
    if (screen === "menu") {
        if (event.offsetX > 184 && event.offsetX < 304 && event.offsetY > 435 && event.offsetY < 509) {
            screen = "goodbye";
        }
    }
});

//Game Loop
function startGame() {
    if (animate === true) draw();
    requestAnimationFrame(startGame);
}
function draw() {
    if(screen === "menu")
        drawMenu();
    else if(screen === "game")
        drawGame();
    else if (screen === "gameOver")
        drawGameOver();
    else if (screen === "win")
        drawWin();
    else if (screen === "goodbye")
        drawGoodbye();
}
startGame();

//draw screens functions
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gameMap, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(bearIMG, 340, 100, 80, 60);
}

function drawMenu() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.drawImage(GrizzlyStart, 0, 0, canvas.width, canvas.height);
}

function drawGameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(LevelFailed, 0, 0, canvas.width, canvas.height);
}

function drawWin() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(LevelSuccessful, 0, 0, canvas.width, canvas.height);
}

function drawGoodbye() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(Goodbye, 0, 0, canvas.width, canvas.height);
}