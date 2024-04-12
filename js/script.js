const game = new Game(25, 15, 20);
game.init();
const restartButton = document.getElementById("restart-button");

// Add an event listener to the restart button
restartButton.addEventListener("click", function () {
  // Call the restartGame function when the button is clicked
  restartGame();
});

// The function that reloads the page to start a new game
function restartGame() {
  location.reload();
}
