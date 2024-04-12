class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  update(blockSize) {
    this.x += this.velocityX * blockSize;
    this.y += this.velocityY * blockSize;
  }
}
