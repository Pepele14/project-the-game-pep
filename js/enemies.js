class StandardEnemy {
  constructor(blockSize, rows, cols) {
    this.blockSize = blockSize;
    this.rows = rows;
    this.cols = cols;
    this.x = 0;
    this.y = 0;
    this.image = new Image();
    this.image.src = "./images/enemy.png";
  }
  place() {
    this.x = Math.floor(Math.random() * this.cols) * this.blockSize;
    this.y = Math.floor(Math.random() * this.rows) * this.blockSize;
  }
  update(blockSize, context) {
    context.drawImage(this.image, this.x, this.y, blockSize, blockSize);
  }
}
