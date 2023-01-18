let min = 3500;
let max = 7000;

class Enemy {
    constructor() {
        this.position = {
            x: 280,
            y: 134
        }
        this.width = 21;
        this.height = 21;
        this.image = new Image();
        this.image.src = 'images/beeL.png';
        this.direction = 1;
        this.intensity = 1 / 4;
        this.scoreCooldown = 0;
    }

    draw() {
        if (this.direction === 1)
            this.image.src = 'images/beeL.png';
        else this.image.src = 'images/beeR.png';
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    movement() {
        this.position.x -= 1.5 * this.direction;

        if (((this.position.x < 67) ||
                (this.position.x > 385)) &&
            this.position.y <= 496
        ) {
            if (this.position.y < 315) this.position.y += 2.3;
            else if (this.position.y >= 315 && this.position.y < 406) this.position.y += 2.5;
            else if (this.position.y >= 406 && this.position.y + this.height < 494) this.position.y += 2.8;
        }

        this.position.y = this.position.y + (-this.intensity * Math.sin(1 / 20 * this.position.x) * this.direction);

        if (this.position.x < 40 || this.position.x > 410) {
            if (this.position.y <= 467 || this.position.x >= 410)
                this.direction = this.direction * -1;
        }
    }

    collision() {
        //player - above bee collision (points)
        if (player.position.x + player.width / 2 > this.position.x - 4 && player.position.x + player.width / 2 < this.position.x + this.width + 4 &&
            player.position.y + player.height < this.position.y && player.position.y + player.height > this.position.y - 40
            && player.onLadder === 0 && this.scoreCooldown === 0 && player.isJumping === true) {
            score += 20;
            this.scoreCooldown = 9;
        }
        if (this.scoreCooldown !== 0) this.scoreCooldown -= 1;

        //death collision
        let circle = {
            x: this.position.x + (this.width / 2),
            y: this.position.y + (this.height / 2),
            r: 7
        }

        let rect = {
            x: player.position.x,
            y: player.position.y,
            w: player.width,
            h: player.height
        }

        var distX = Math.abs(circle.x - rect.x - rect.w / 2);
        var distY = Math.abs(circle.y - rect.y - rect.h / 2);

        if (distX > (rect.w / 2 + circle.r)) {
            return false;
        }
        if (distY > (rect.h / 2 + circle.r)) {
            return false;
        }

        if (distX <= (rect.w / 2)) {
            return true;
        }
        if (distY <= (rect.h / 2)) {
            return true;
        }

        var dx = distX - rect.w / 2;
        var dy = distY - rect.h / 2;
        return (dx * dx + dy * dy <= (circle.r * circle.r));
    }

    update() {
        this.draw();
        this.movement();
        if (this.collision()) {
            score = 0;
            freeze(1);
            screen = 'gameOver';
        }
    }
}

function beeUpdater() {
    for (let i = 0; i < enemies.length; i++) { //update bee
        enemies[i].update();
    }
}

//make array of instances of Enemy class
let enemies = [];
enemies.push(new Enemy());

function spawnEnemy() { // spawns enemies
    if (screen === 'game') {
        enemies.push(new Enemy());
        if (min > 1500) min -= 150;
        if (max > 2000) max -= 250;
    }
    //removes enemies that are no longer onscreen
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].position.x < -20 && enemies[i].position.y > -467) {
            enemies.splice(i, 1);
        }
    }
}

(function loop() { // loops enemy spawning at random interval
    let rand = Math.round(Math.random() * (max - min)) + min;
    setTimeout(function () {
        spawnEnemy();
        loop();
    }, rand);
}());