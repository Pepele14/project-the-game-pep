class Food {
  constructor(blockSize, rows, cols) {
    this.blockSize = blockSize;
    this.rows = rows;
    this.cols = cols;
    this.x = 0;
    this.y = 0;
  }

  place() {
    this.x = Math.floor(Math.random() * this.cols) * this.blockSize;
    this.y = Math.floor(Math.random() * this.rows) * this.blockSize;
  }
}

class Cell extends Food {
  constructor(blockSize, rows, cols) {
    super(blockSize, rows, cols);
  }
  hasScoreMultiplier() {
    // Implementation for the hasMultiplier method
    // I need to define scoring system 1st
  }
}
//No need to define x and y here as they are
//already defined in the parent class
