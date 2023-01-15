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

const jump = new Audio("jump.wav");

//functions
function getCookie(highScore) {
    var name = highScore + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
}

highScore = getCookie("highScore");

function reset() {
    //player
    player.reset();

    //enemy
    enemies = [];
    enemies.push(new Enemy());
    score = 0;
}

//event listener for menus
canvas.addEventListener("click", function (event) {  //start menu buttons
    if (screen === "menu") { //menu
        if (event.offsetX > 170 && event.offsetX < 315 && event.offsetY > 343 && event.offsetY < 406) {
            screen = "game";
        } else if (event.offsetX > 184 && event.offsetX < 304 && event.offsetY > 435 && event.offsetY < 509) {
            screen = "goodbye";
        }
    }
    if (screen === "gameOver") { //loss screen
        if (event.offsetX > 114 && event.offsetX < 331 && event.offsetY > 355 && event.offsetY < 432) {
            screen = "game";
            reset();
        } else if (event.offsetX > 160 && event.offsetX < 280 && event.offsetY > 450 && event.offsetY < 520) {
            screen = "goodbye";
        }
    }
    console.log(event.offsetX, event.offsetY);
});

//Game Loop
function startGame() {
    if (animate === true) draw();
    requestAnimationFrame(startGame);
}

function draw() {
    if (screen === "menu") {
        drawMenu();
        document.getElementById("scoreBoard").innerHTML = "High score: " + highScore;
        console.log(highScore);
    } else if (screen === "game") {
        drawGame();
    } else if (screen === "gameOver") {
        drawGameOver();
        document.getElementById("scoreBoard").innerHTML = "High score: " + highScore;
    } else if (screen === "win") {
        drawWin();
        document.getElementById("scoreBoard").innerHTML = "High score: " + highScore;
    } else if (screen === "goodbye")
        drawGoodbye();
}

startGame();

//draw screens functions
function drawMenu() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(grizzlyStart, 0, 0, canvas.width, canvas.height);
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gameMap, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(bearIMG, 340, 100, 80, 60);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 350, 20);

    player.update();
    beeUpdater();
}

function drawGameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(levelFailed, 0, 0, canvas.width, canvas.height);

    highScore = getCookie("highScore");
    if (score > highScore || highScore === undefined) {
        highScore = score;
        var d = new Date();
        d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = "highScore=" + highScore + ";" + expires + ";path=/";
    }

}

function drawWin() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(levelSuccessful, 0, 0, canvas.width, canvas.height);
}

function drawGoodbye() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(goodbye, 0, 0, canvas.width, canvas.height);
}