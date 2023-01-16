const gravity = 0.3;
const platforms = [
    [158, 168, 85], //top to bottom
    [235, 245, 362],
    [315, 325, 85],
    [405, 415, 362],
    [495, 505, 1000],
    [562, 572, 1000]
];
const ladders = [
    [273, 498, 289, 559], //bottom 61
    [341, 408, 357, 492], //2nd from bottom 84
    [114, 318, 130, 402], //3rd from bottom 84
    [204, 237, 220, 313], //2nd from top (left) 76
    [295, 237, 311, 313], //2nd from top (right) 76
    [114, 159, 130, 235], //top 76
    [163, 470.2, 179, 493], //broken ladders
    [319, 382, 335, 403],
    [254, 207, 270, 232],
    [252, 90, 268, 158] //win
];

class Player {
    constructor() {
        this.reset();
    }

    reset() {
        this.position = {
            x: 25,
            y: 522
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30;
        this.height = 30;
        this.image = new Image();
        this.image.src = 'images/bunnyR.png';
        this.isJumping = false;
        this.onLadder = 0; //0 = not on ladder, 1 = on ladder (up/down), 2 = on ladder (down)
        this.onPlatform = false
    }

    ladder(x, y, w, h) {
        if (this.position.x + this.width / 2 >= x && this.position.x + this.width / 2 <= w
            && this.position.y + this.height + this.velocity.y <= h && this.position.y + this.height + this.velocity.y >= y
            && this.onPlatform) {
            this.isJumping = true;
            this.velocity.y = 0;
            this.onLadder = 1;
            return true;
        } else if (this.position.x + this.width / 2 >= x && this.position.x + this.width / 2 <= x + 16 &&
            this.position.y + this.height + this.velocity.y <= h && this.position.y + this.height + this.velocity.y >= y - 3
            && this.onPlatform) {
            this.onLadder = 2;
            return true;
        } else return false;
    }

    draw() {
        if (this.velocity.x > 0)
            this.image.src = 'images/bunnyR.png';
        else if (this.velocity.x < 0)
            this.image.src = 'images/bunnyL.png';
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    collisions() {
        //wall collision
        if (this.position.x <= 16 && this.velocity.x < 0) //left wall
            this.position.x = 16;
        else if (this.position.x + this.width >= 434 && this.velocity.x > 0) //right wall
            this.position.x = 434 - this.width;

        //ladder collision
        for (let i = 0; i < ladders.length; i++) {
            if (this.ladder(ladders[i][0], ladders[i][1], ladders[i][2], ladders[i][3])) {
                this.ladder(ladders[i][0], ladders[i][1], ladders[i][2], ladders[i][3]);
                break;
            } else this.onLadder = 0;
        }

        //platform collision
        if (this.onLadder === 0) {
            for (let i = 0; i < platforms.length; i++) {
                if (this.position.y + this.height + this.velocity.y >= platforms[i][0] && this.position.y + this.height + this.velocity.y <= platforms[i][1]) {
                    if (platforms[i][2] === 85 && this.position.x + this.width >= 85 || platforms[i][2] === 362 && this.position.x <= 362 || platforms[i][2] === 1000) {
                        this.velocity.y = 0;
                        this.isJumping = false;
                        this.onPlatform = true;
                        break;
                    } //if
                } else this.onPlatform = false;
            } //for
        } //if
    }

    gravity() {
        if (this.onPlatform === false && this.onLadder === 0) {
            this.velocity.y += gravity;
        }
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.collisions();
        this.gravity();

        if (this.position.y + this.height < 98) {
            freeze(2);
            screen = "gameWon";
        }
    }
} //Player class

const player = new Player(); //making instance of player class

//event listeners
window.addEventListener("keydown", function (event) { //player left/right movement
    if (event.key === 'ArrowLeft' && player.onLadder !== 1) { //left
        player.velocity.x = -2;
    }
    if (event.key === 'ArrowRight' && player.onLadder !== 1) { //right
        player.velocity.x = 2;
    }

    if (event.key === 'ArrowUp' && player.onLadder === 1) { //up ladder
        player.position.y -= 8;
    } else if (event.key === 'ArrowUp' && player.isJumping === false) { //jump
        player.velocity.y = -3.8;
        player.isJumping = true;
        jump.play();
    }

    if (event.key === 'ArrowDown' && player.onLadder > 0) { //down ladder
        player.position.y += 8;
    }
});

window.addEventListener("keyup", function (event) { //stop moving when key is released
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
        player.velocity.x = 0;
});