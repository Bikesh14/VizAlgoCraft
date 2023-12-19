/**
 * Represents the game board for pathfinding visualization.
 * @constructor
 * @property {number} rows - The number of rows on the board.
 * @property {number} cols - The number of columns on the board.
 * @property {Cell[][]} grid - 2D array representing the grid of cells on the board.
 * @property {boolean} heuristics - Flag indicating whether heuristics have been initialized.
 * @property {Cell} start - The starting cell on the board.
 * @property {Cell} goal - The goal cell on the board.
 */

class Board {
  constructor() {
    this.rows = parseInt(height / scale - 1);
    this.cols = parseInt(width / scale);
    this.grid = [];
    this.heuristics = false;

    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(new Cell(j, i)); //populate with Cell object
      }
      this.grid.push(row);
    }

    // start and goal positions
    let Y1 = 1;
    let Y2 = parseInt(this.rows - 2);
    let X1 = 1;
    let X2 = parseInt(this.cols - 2);

    this.grid[Y1][X1].start = true;
    this.grid[Y2][X2].goal = true;

    this.start = this.grid[Y1][X1];
    this.goal = this.grid[Y2][X2];
  }

  // Display all cells
  show() {
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        //executes the show method of individual cell object
        this.grid[i][j].show();
      }
    }
  }

  //clears all the paths and walls
  async reset() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j].isWall = false;
        this.grid[i][j].hasBeenDiscovered = false;
        this.grid[i][j].parent = false;
        this.grid[i][j].weight = 0;
      }
    }
    this.show();
  }

  //clears the path drawn/found
  clearPath() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j].hasBeenDiscovered = false;
        this.grid[i][j].parent = false;
      }
    }
    this.show();
  }

  // Add a wall at a particular index
  addWall(x, y) {
    if (y >= this.rows || x >= this.cols || y < 0 || x < 0) {
      return;
    }
    if (this.grid[y][x].start == true || this.grid[y][x].goal == true) {
      return;
    }
    this.grid[y][x].isWall = true;
    this.grid[y][x].weight = Infinity;
    this.grid[y][x].show();
  }

  // Toggle isWall at particular index
  toggleWall(x, y) {
    if (y >= this.rows || x >= this.cols || y < 0 || x < 0) {
      return;
    }
    this.grid[y][x].toggleWall();
    this.grid[y][x].show();
  }
  // Returns the neighbors of a cell
  getNeighbors(cell) {
    let i = cell.y;
    let j = cell.x;
    let neighbors = [];

    if (i != this.rows - 1) {
      neighbors.push([i + 1, j]);
    }
    if (i > 0) {
      neighbors.push([i - 1, j]);
    }
    if (j != this.cols - 1) {
      neighbors.push([i, j + 1]);
    }
    if (j > 0) {
      neighbors.push([i, j - 1]);
    }

    return neighbors;
  }

  //initialize heuristics for the A* and Dijkstra's algorithm
  async initializeHeuristics() {
    // if heuristics are already initialized, reset the gScore
    if (this.heuristics) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.grid[i][j].gScore = 0;
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.grid[i][j].gScore = 0;
          this.grid[i][j].hScore =
            Math.abs(this.grid[i][j].x - this.goal.x) +
            Math.abs(this.grid[i][j].y - this.goal.y);
        }
      }
      this.heuristics = true;
    }
  }
}
