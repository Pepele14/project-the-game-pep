class Player {
  constructor(x, y, imageSrc) {
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.image = new Image();
    this.image.src = "./images/player.jpg";
  }

  update(blockSize, context) {
    this.x += this.velocityX * blockSize;
    this.y += this.velocityY * blockSize;
    context.drawImage(this.image, this.x, this.y, blockSize, blockSize);
  }
}
