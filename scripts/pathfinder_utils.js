const algoField = document.getElementById("pathfindingAlgo");

// Wrapper function for all pathfinding algorithms
async function pathfinder() {
  if (isInProgress) {
    return;
  }
  algoName = algoField.value;
  isInProgress = true;
  if (algoName == "astar") {
    await board.initializeHeuristics();
    await aStarSearch().then(() => {
      isInProgress = false;
    });
  } else if (algoName == "dijkstra") {
    await board.initializeHeuristics();
    await dijkstra().then(() => {
      isInProgress = false;
    });
  } else if (algoName == "breadth") {
    await board.resetWeights();
    await breadthFirstSearch().then(() => {
      isInProgress = false;
    });
  } else if (algoName == "depth") {
    await board.resetWeights();
    await depthFirstSearch().then(() => {
      isInProgress = false;
    });
  }
}

// Sets the size of the canvas
async function setSize() {
  width =
    window.innerWidth * widthRatio - ((window.innerWidth * widthRatio) % scale);
  height = window.innerHeight * heightRatio;
  canvasPathfinder.width = width;
  canvasPathfinder.height = height;
}

// Drawing the shortest path from goal to beginning
// this should be called ONLY IF the path exists
async function drawPath() {
  // goal
  let path = [];
  let current = board.goal;

  // from goal to beginning
  while (current != board.start) {
    path.unshift(current);
    current = current.parent;
  }
  path.unshift(board.start);

  for (let i = 1; i < path.length && !interrupt; i++) {
    await path[i].show(custom_orange);

    // draw a path from this to prev
    await path[i].drawPathLine(path[i - 1]);
    await sleep(1000 / fps);
  }
}

// Async sleep function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Resets the board i.e., the path and the walls
async function reset() {
  interrupt = true;
  await sleep(2500 / fps);
  board.reset();
  interrupt = false;
}

// Removes the path
async function resetPath() {
  interrupt = true;
  await sleep(2500 / fps);
  board.clearPath();
  interrupt = false;
}

// A new board is generated when the window is resized
async function resizeFn() {
  interrupt = true;
  await sleep(2500 / fps);
  setSize();
  board = new Board();
  board.show();
  interrupt = false;
}
window.onresize = resizeFn;

// Wrapper function to call randomMaze
async function generateMaze() {
  if (isInProgress) {
    return;
  }
  isInProgress = true;
  await randomMaze(randomMazeProbability).then(() => {
    isInProgress = false;
  });
}

// Random Int function in range [low, high)
function randInt(low, high) {
  return Math.floor(Math.random() * (high - low)) + low;
}
