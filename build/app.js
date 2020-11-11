class Car {
    constructor(name, colour, xPos, yPos) {
        this._xPosition = xPos;
        this._yPosition = yPos;
        this._name = name;
        this.image = this.loadNewImage(`./assets/img/${colour}-racing-car.png`);
    }
    set distance(distanceRaced) {
        this._distance = distanceRaced;
    }
    get distance() {
        return this._distance;
    }
    get xPostition() {
        return this._xPosition;
    }
    get yPostition() {
        return this._yPosition;
    }
    get name() {
        return this._name;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this._xPosition, this._yPosition);
    }
    move() {
        this._xPosition += 10;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
KeyboardListener.KEY_R = 82;
KeyboardListener.KEY_T = 84;
KeyboardListener.KEY_B = 66;
class Game {
    constructor(canvas) {
        this.loop = () => {
            if (this.gameState == "begin") {
                this.beginScreen();
            }
            else if (this.gameState == "dice") {
                this.diceScreen();
            }
            else if (this.gameState == "animate") {
                this.animate();
            }
            else if (this.gameState == "end") {
                this.endScreen();
            }
            this.draw();
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.keyboardListener = new KeyboardListener();
        this.car1 = new Car("Bullet", "red", 100, 200);
        this.car2 = new Car("Greek Arrow", "green", 100, 500);
        console.log(this.car1);
        this.gameState = "begin";
        this.loop();
    }
    rollDice(min = 100, max = this.canvas.width - 300) {
        return this.randomNumber(min, max);
    }
    beginScreen() {
        this.writeTextToCanvas("Press R to Roll the dice", 30, this.canvas.width / 2, this.canvas.height - 50);
        this.writeTextToCanvas("Phase: begin", 40, this.canvas.width / 2, 50, "center", "white");
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_R)) {
            this.gameState = "dice";
            this.car1.distance = this.rollDice();
            this.car2.distance = this.rollDice();
        }
    }
    diceScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.gameState = "animate";
    }
    endScreen() {
        console.log("in end");
        if (this.car1.distance > this.car2.distance) {
            this.winner = this.car1.name;
        }
        else if (this.car1.distance < this.car2.distance) {
            this.winner = this.car2.name;
        }
        else {
            this.winner = "undecided";
        }
        this.writeTextToCanvas(`Winner is ${this.winner}`, 60, this.canvas.width / 2, this.canvas.height - 50, "center", "red");
    }
    draw() {
        this.car1.draw(this.ctx);
        this.car2.draw(this.ctx);
    }
    animate() {
        console.log("animate");
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.car1.xPostition < this.car1.distance) {
            this.car1.move();
        }
        else if (this.car2.xPostition < this.car2.distance) {
            this.car2.move();
        }
        else if (this.car1.xPostition >= this.car1.distance &&
            this.car2.xPostition >= this.car2.distance) {
            this.gameState = "end";
            console.log("end");
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = () => new Game(document.getElementById("canvas"));
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map