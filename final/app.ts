/// <reference path="Car.ts" />
/// <reference path="KeyboardListener.ts" />

class Game {
  // Necessary canvas attributes
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  // KeyboardListener so the player can move
  private keyboardListener: KeyboardListener;

  // the state of the game: begin, dice and end
  private gameState: string;
  private winner: string;

  // Car instances, one for each player
  private car1: Car;
  private car2: Car;

  constructor(canvas: HTMLCanvasElement) {
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

  /**
   * Function to give a number between 1 and 6
   * @returns {number} number - number between 1 and 6
   */
  private rollDice(
    min: number = 100,
    max: number = this.canvas.width - 300
  ): number {
    return this.randomNumber(min, max);
  }

  /**
   * Method for the Game Loop
   * Based on the game state some actions have to be executed
   */
  private loop = () => {
    // switch (this.gameState) {
    //   case "begin":
    //     this.beginScreen();
    //     break;
    //   case "dice":
    //     this.diceScreen();
    //     break;
    //   case "chooseUpgrade":
    //     this.upgradeScreen();
    //     break;
    //   case "animate":
    //     this.animate();
    //     break;
    //   case "end":
    //     this.endScreen();
    //     break;
    //   default:
    //     this.beginScreen();
    //     break;
    // }
    // this.draw();
    // requestAnimationFrame(this.loop);

    if (this.gameState == "begin") {
      this.beginScreen();
    } else if (this.gameState == "dice") {
      this.diceScreen();
    } else if (this.gameState == "animate") {
      this.animate();
      // this.gameState = "end";
    } else if (this.gameState == "end") {
      this.endScreen();
    }
    this.draw();
    requestAnimationFrame(this.loop);
  };

  private beginScreen() {
    this.writeTextToCanvas(
      "Press R to Roll the dice",
      30,
      this.canvas.width / 2,
      this.canvas.height - 50
    );
    this.writeTextToCanvas(
      "Phase: begin",
      40,
      this.canvas.width / 2,
      50,
      "center",
      "white"
    );
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_R)) {
      this.gameState = "dice";
      this.car1.distance = this.rollDice();
      this.car2.distance = this.rollDice();
    }
  }

  private diceScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.gameState = "animate";
  }

  // private upgradeScreen() {
  //   this.writeTextToCanvas(
  //     "Press B to boost the Car",
  //     30,
  //     this.canvas.width / 2,
  //     this.canvas.height - 50
  //   );
  //   if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_B)) {
  //     this.car1.upgrade = this.rollDice(100, 800);
  //     this.car2.upgrade = this.rollDice(100, 800);
  //     console.log(this.car1.upgrade);
  //     this.gameState = "animate";
  //   }
  // }

  private endScreen() {
    console.log("in end");
    if (this.car1.distance > this.car2.distance) {
      this.winner = this.car1.name;
    } else if (this.car1.distance < this.car2.distance) {
      this.winner = this.car2.name;
    } else {
      this.winner = "undecided";
    }
    this.writeTextToCanvas(
      `Winner is ${this.winner}`,
      60,
      this.canvas.width / 2,
      this.canvas.height - 50,
      "center",
      "red"
    );
  }

  /**
   * Function to draw all the cars on the canvas
   */
  private draw() {
    this.car1.draw(this.ctx);
    this.car2.draw(this.ctx);
  }

  private animate() {
    console.log("animate");
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.car1.xPostition < this.car1.distance) {
      this.car1.move();
    } else if (this.car2.xPostition < this.car2.distance) {
      this.car2.move();
    } else if (
      this.car1.xPostition >= this.car1.distance &&
      this.car2.xPostition >= this.car2.distance
    ) {
      this.gameState = "end";
      console.log("end");
    }
    // //if (boost + distance) is on screen?
    // if (this.car1.upgrade + this.car1.distance >= this.canvas.width) {
    //   console.log("busted");
    //   this.winner = this.car2.name;
    //   this.gameState = "end";
    // } else if (this.car2.upgrade + this.car2.distance >= this.canvas.width) {
    //   this.winner = this.car1.name;
    //   console.log("busted");
    //   this.gameState = "end";
    // } else {
    //   if (this.car1.xPostition < this.car1.distance) {
    //     this.car1.move();
    //   } else if (this.car2.xPostition < this.car2.distance) {
    //     this.car2.move();
    //   } else if (
    //     this.car1.xPostition >= this.car1.distance &&
    //     this.car2.xPostition >= this.car2.distance
    //   ) {
    //     this.gameState = "end";
    //     console.log("end");
    //   }
    // }
  }

  /**
   * Writes text to the canvas
   * @param {string} text - Text to write
   * @param {number} fontSize - Font size in pixels
   * @param {number} xCoordinate - Horizontal coordinate in pixels
   * @param {number} yCoordinate - Vertical coordinate in pixels
   * @param {string} alignment - Where to align the text
   * @param {string} color - The color of the text
   */
  public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = "center",
    color: string = "red"
  ) {
    this.ctx.font = `${fontSize}px Minecraft`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
  /**
   * Renders a random number between min and max
   * @param {number} min - minimal time
   * @param {number} max - maximal time
   */
  public randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}

/**
 * Start the game whenever the entire DOM is loaded
 */
let init = () =>
  new Game(document.getElementById("canvas") as HTMLCanvasElement);

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
