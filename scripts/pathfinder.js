setSize();
board = new Board();
board.show();

function getGridIndicesFromPos(posX, posY) {
  const rect = canvasPathfinder.getBoundingClientRect();

  // Return false if the pos is outside the canvas
  if (posX > rect.left + canvasPathfinder.width) {
    return false;
  }
  let x = posX - rect.left;
  let y = posY - rect.top;
  x = parseInt(x / scale);
  y = parseInt(y / scale);

  return {
    x: x,
    y: y,
  };
}
