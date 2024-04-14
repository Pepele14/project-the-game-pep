class Food {
  constructor(blockSize, rows, cols) {
    this.blockSize = blockSize;
    this.rows = rows;
    this.cols = cols;
    this.x = 0;
    this.y = 0;
    this.image = new Image();
    this.image.src = "./images/Multi.png";
  }

  place() {
    this.x = Math.floor(Math.random() * this.cols) * this.blockSize;
    this.y = Math.floor(Math.random() * this.rows) * this.blockSize;
  }

  update(blockSize, context) {
    context.drawImage(this.image, this.x, this.y, blockSize, blockSize);
  }
}

class Cell extends Food {
  constructor(blockSize, rows, cols) {
    super(blockSize, rows, cols);
    this.image = new Image();
    this.image.src = "./images/red.png";
  }
}
//No need to define x and y here as they are
//already defined in the parent class
