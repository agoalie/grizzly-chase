class Bee {
    constructor() {
        this.x = 330;
        this.y = 130;
        this.width = 50;
        this.height = 25;
        this.beeIMG = new Image();
        this.beeIMG.src = 'images/bee.png';
    }
    makeBee() {
        this.move();
        this.draw();
    }
    draw() {
        ctx.drawImage(this.beeIMG, this.x, this.y, this.width, this.height);
    }
    move() {
        this.x -= 1;
    }
}

//make an instance of the Bee class

const bee = new Bee();