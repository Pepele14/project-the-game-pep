class StandardEnemy {
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
