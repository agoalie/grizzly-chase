class Enemy {
    constructor() {
        this.position = {
            x: 280,
            y: 132
        }
        this.width = 20;
        this.height = 20;
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
            //this.position.x = 500;
            if (this.position.y <= 467 || this.position.x >= 410)
                this.direction = this.direction * -1;
            //this.position.y = 385;
        }
    }

    collision() {
        //player - above bee collision (points)
        if (player.position.x + player.width / 2 > this.position.x - 4 && player.position.x + player.width / 2 < this.position.x + this.width + 4 &&
            player.position.y + player.height < this.position.y && player.position.y + player.height > this.position.y - 40
            && player.onLadder === 0 && this.scoreCooldown === 0 && player.isJumping === true) {
            score += 20;
            this.scoreCooldown = 9;
            console.log(score);
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
            w: player.width - 8,
            h: player.height - 8
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


        //death collision
        // let distX = Math.abs((this.position.x + (this.width / 2)) - player.position.x);
        // let distY = Math.abs((this.position.y + (this.height / 2)) - player.position.y);
        //
        // if (distX > (player.width / 2 + 10)) {
        //     return false;
        // }
        // if (distY > (player.height / 2 + 10)) {
        //     return false;
        // }
        //
        // if (distX <= (player.width / 2)) {
        //     return true;
        // }
        // if (distY <= (player.height / 2)) {
        //     return true;
        // }
        //
        // let distC = Math.pow((distX - player.width / 2), 2) + Math.pow((distY - player.height / 2), 2);
        //
        // return (distC <= Math.pow((10), 2));


        // //player - bee collision (death)
        // //find distance between bee and player's center
        // let distX = Math.abs(this.position.x + this.width / 2 - player.position.x - player.width / 2);
        // let distY = Math.abs(this.position.y + this.height / 2 - player.position.y - player.height / 2);
        // //if distance is greater than the sum of the radius's, no collision
        // if (distX > (player.width / 2 + this.width / 2)) return false;
        // if (distY > (player.height / 2 + this.height / 2)) return false;
        // //if distance is less than the radius of the bee, collision
        // if (distX < (player.width / 2 + 4)) return true;
        // if (distY < (player.height / 2 + 4)) return true;
        // //test for collision on the corners – pythagorean theorem
        // let a = distX - player.width / 2;
        // let b = distY - player.height / 2;
        // return (a * a + b * b <= (this.width / 2 * (this.width / 2)));
    }

    update() {
        this.draw();
        this.movement();
        if (this.collision()) {
            freeze(2);
            screen = 'gameOver';
        }
    }
}

function freeze(secs) {
    const waitUntil = performance.now() + secs * 1000;
    while (performance.now() < waitUntil) ;
}

function beeUpdater() {
    for (let i = 0; i < enemies.length; i++) { //update bee
        enemies[i].update();
    }
}

//make array of instances of Enemy class
let enemies = [];
enemies.push(new Enemy());

function spawnEnemy() {
    if (screen === 'game') {
        enemies.push(new Enemy());
    }
}

(function loop() {
    let rand = Math.round(Math.random() * (7000 - 3500)) + 3500;
    setTimeout(function () {
        spawnEnemy();
        loop();
    }, rand);
}());