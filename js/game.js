class Game {
  constructor(blockSize, rows, cols) {
    this.gameEndScreen = document.getElementById("game-end");
    this.gameScreen = document.getElementById("board");
    this.startScreen = document.getElementById("game-intro");
    this.scoringElement = document.getElementById("score");
    this.blockSize = blockSize;
    this.rows = rows;
    this.cols = cols;
    this.board = null; //double check if i actually need it
    this.context = null;
    this.player = new Player(this.blockSize * 5, this.blockSize * 5);
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
    // this.startScreen.style.display = "none";

    this.board = document.getElementById("board");
    this.board.height = this.rows * this.blockSize;
    this.board.width = this.cols * this.blockSize;
    this.context = this.board.getContext("2d");
    this.food.place();
    this.cell.place();
    this.standardEnemy.place();
    document.addEventListener("keyup", this.changeDirection.bind(this));
    setInterval(this.update.bind(this), 1000 / 10);
  }

  update() {
    if (this.gameOver) {
      return;
    }

    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.board.width, this.board.height);
    this.drawScore();

    if (this.score > 100) {
      this.context.fillStyle = "yellow";
      this.context.fillRect(0, 0, this.board.width, this.board.height);
      this.drawScore();
    }

    if (this.score > 500) {
      this.context.fillStyle = "orange";
      this.context.fillRect(0, 0, this.board.width, this.board.height);
      this.drawScore();
    }

    this.context.fillStyle = "lime";
    this.player.update(this.blockSize);
    this.context.fillRect(
      this.player.x,
      this.player.y,
      this.blockSize,
      this.blockSize
    );

    this.context.fillStyle = "red";
    this.context.fillRect(
      this.food.x,
      this.food.y,
      this.blockSize,
      this.blockSize
    );

    this.context.fillStyle = "blue";
    this.context.fillRect(
      this.cell.x,
      this.cell.y,
      this.blockSize,
      this.blockSize
    );

    this.context.fillStyle = "grey";
    this.context.fillRect(
      this.standardEnemy.x,
      this.standardEnemy.y,
      this.blockSize,
      this.blockSize
    );

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
    this.context.font = "10px Verdana";
    this.context.fillText(
      "Score " + this.score,
      this.gameScreen.width - 100,
      10
    );
  }

  gameOverScreen() {
    this.gameScreen.style.display = "none";

    this.gameEndScreen.style.display = "block";
  }
}
