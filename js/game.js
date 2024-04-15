class Game {
  constructor(blockSize, rows, cols) {
    this.gameEndScreen = document.getElementById("game-end");
    this.gameScreen = document.getElementById("board");
    this.startScreen = document.getElementById("game-intro");
    this.scoringElement = document.getElementById("score");
    this.blockSize = blockSize; //represents the size of each block or square in the game grid
    this.rows = rows;
    this.cols = cols;
    this.board = null; //Do I actually need it like this? I dont think so
    this.context = null; //same for this one
    this.player = new Player(
      this.blockSize * 5,
      this.blockSize * 5,
      "./images/player.png"
    ); //initialising player's starting position
    this.food = new Food(this.blockSize, this.rows, this.cols);
    this.cell = new Cell(this.blockSize, this.rows, this.cols);
    this.standardEnemy = new StandardEnemy(
      this.blockSize,
      this.rows,
      this.cols
    );
    this.gameOver = false;
    this.score = 0;
  }

  init() {
    this.startScreen.style.display = "none";
    // this.instructionsPanel.style.display = "block"; // NOT REALLY WORKING ATM
    this.gameScreen.style.display = "inline-flex";
    this.board = document.getElementById("board");
    this.board.height = this.rows * this.blockSize;
    this.board.width = this.cols * this.blockSize;
    this.context = this.board.getContext("2d");
    alert(
      "GAME INSTRUCTIONS: Use the arrow keys to manoeuvre the player (green box) - Avoid the grey box and borders."
    );

    this.food.place();
    this.cell.place();
    this.standardEnemy.place();
    document.addEventListener("keyup", this.changeDirection.bind(this));
    // This code adds an event listener for the keyup event on the document.
    //When a key is released, the changeDirection method is called.
    //The bind(this) ensures that this inside changeDirection refers to the Game object.
    setInterval(this.update.bind(this), 1000 / 10); //Game Loop
    // This code sets up a game update loop using setInterval.
    //The update method is called every 1000 / 10 milliseconds (i.e., 10 times per second).
    //Again, bind(this) ensures that this inside update refers to the Game object.
    this.context.imageSmoothingEnabled = true; //mOST LIKELY NO LONGER NEEDED
  }

  update() {
    if (this.gameOver) {
      return;
    }

    this.context.fillStyle = "orange";
    this.context.fillRect(0, 0, this.board.width, this.board.height);
    this.drawScore();

    if (this.score > 100) {
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.board.width, this.board.height);
      this.drawScore();
    }

    if (this.score > 1500) {
      this.context.fillStyle = "yellow";
      this.context.fillRect(0, 0, this.board.width, this.board.height);
      this.drawScore();
    }

    if (this.score > 4500) {
      this.context.fillStyle = "purple";
      this.context.fillRect(0, 0, this.board.width, this.board.height);
      this.drawScore();
    }

    if (this.score > 10000) {
      this.context.fillStyle = "brown";
      this.context.fillRect(0, 0, this.board.width, this.board.height);
      this.drawScore();
    }

    //calling update method for spawning game elements
    this.player.update(this.blockSize, this.context);

    this.food.update(this.blockSize, this.context);

    this.cell.update(this.blockSize, this.context);

    this.standardEnemy.update(this.blockSize, this.context);

    if (this.player.x === this.food.x && this.player.y === this.food.y) {
      this.score += 1;
      console.log(this.score);
      this.food.place();
    }
    if (this.player.x === this.cell.x && this.player.y === this.cell.y) {
      this.score *= 2;
      console.log(this.score);
      this.cell.place();
    }

    if (
      this.player.x === this.standardEnemy.x &&
      this.player.y === this.standardEnemy.y
    ) {
      this.gameOver = true;
      this.gameOverScreen();
    }

    if (
      this.player.x < 0 ||
      this.player.x > this.board.width - this.blockSize ||
      this.player.y < 0 ||
      this.player.y > this.board.height - this.blockSize
    ) {
      this.gameOver = true;
      this.gameOverScreen();
      console.log("Game Over");
      //   alert("test");
    }
  }

  changeDirection(e) {
    if (e.code === "ArrowUp") {
      this.player.velocityX = 0;
      this.player.velocityY = -1;
    } else if (e.code === "ArrowDown") {
      this.player.velocityX = 0;
      this.player.velocityY = 1;
    } else if (e.code === "ArrowLeft") {
      this.player.velocityX = -1;
      this.player.velocityY = 0;
    } else if (e.code === "ArrowRight") {
      this.player.velocityX = 1;
      this.player.velocityY = 0;
    }
  }

  drawScore() {
    this.context.fillStyle = "white";
    this.context.font = "50px Verdana";
    this.context.fillText(
      "Score " + this.score,
      this.gameScreen.width - 800,
      100
    );
  }

  gameOverScreen() {
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
