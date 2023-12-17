setSize();
board = new Board();
board.show();

function getGridIndicesFromPos(posx, posy) {
  const rect = canvasPathfinder.getBoundingClientRect();

  // Return false if the pos is outsize the canvas
  if (posx > rect.left + canvasPathfinder.width) {
    return false;
  }
  let x = posx - rect.left;
  let y = posy - rect.top;
  x = parseInt(x / scale);
  y = parseInt(y / scale);

  return {
    x: x,
    y: y,
  };
}

canvasPathfinder.addEventListener("click", () => {
  if (isInProgress) {
    return;
  }
  let indices = getGridIndicesFromPos(event.clientX, event.clientY);
  if (indices) {
    board.toggleWall(indices.x, indices.y);
  }
});

// to keep track of if the mouse is dragged
let mouseDragging = false;
canvasPathfinder.addEventListener("mousedown", (event) => {
  if (isInProgress) {
    return;
  }
  mouseDragging = true;
});

canvasPathfinder.addEventListener("mousemove", (event) => {
  if (isInProgress || !mouseDragging) {
    return;
  }
  let indices = getGridIndicesFromPos(event.clientX, event.clientY);
  if (indices) {
    board.addWall(indices.x, indices.y);
  }
});

canvasPathfinder.addEventListener("mouseup", (event) => {
  if (isInProgress) {
    return;
  }
  mouseDragging = false;
});
