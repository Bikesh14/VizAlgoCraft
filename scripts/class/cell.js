/**
 * Represents a cell on the game board for pathfinding visualization.
 * @constructor
 * @property {number} x - The x-coordinate of the cell.
 * @property {number} y - The y-coordinate of the cell.
 * @property {boolean} isWall - Flag indicating whether the cell is a wall.
 * @property {boolean} hasBeenDiscovered - Flag indicating whether the cell has been discovered during search.
 * @property {Cell} parent - The parent cell from which the current cell was discovered.
 * @property {number} weight - The weight of the cell, used in algorithms.
 * @property {boolean} start - Flag indicating whether the cell is the start position.
 * @property {boolean} goal - Flag indicating whether the cell is the goal position.
 */

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isWall = false;
    this.hasBeenDiscovered = false;
    this.parent = false;
    this.weight = 0;
    this.start = false;
    this.goal = false;
  }

  // Toggle the Wall
  toggleWall() {
    if (this.start || this.goal) {
      return;
    }
    if (this.isWall) {
      this.isWall = false;
      this.weight = 0;
    } else {
      this.isWall = true;
      this.weight = Infinity;
    }
  }

  //change color of visited node
  async visitNode() {
    sleep(2500 / fps).then(() => {
      this.show(visitedColor);
    });
  }

  //change color of discovered node
  async discoverNode(parent) {
    this.hasBeenDiscovered = true;
    this.parent = parent;
    this.show(custom_alert_color);
    sleep(2500 / fps).then(() => {
      this.show(discoveredColor);
    });
    await sleep(1000 / fps);
  }

  //display each cell
  async show(color) {
    // Default fill and stroke
    context.lineWidth = 1;
    context.strokeStyle = defaultBorder;
    context.fillStyle = defaultColor;
    //if start node, show the starting image
    if (this.start) {
      let image = new Image();
      image.src = startImg;
      image.onload = () => {
        context.clearRect(this.x * scale, this.y * scale, scale, scale);
        context.drawImage(
          image,
          this.x * scale + 2,
          this.y * scale + 2,
          scale - 4,
          scale - 4
        );
      };
      return;
    } else if (this.goal) {
      let image = new Image();
      image.src = endImg;
      image.onload = () => {
        context.clearRect(this.x * scale, this.y * scale, scale, scale);
        context.drawImage(
          image,
          this.x * scale + 2,
          this.y * scale + 2,
          scale - 2,
          scale - 2
        );
      };
      return;
    } else if (this.isWall) {
      context.fillStyle = custom_black;
    } else if (color) {
      context.fillStyle = color;
    } else if (this.hasBeenDiscovered) {
      context.fillStyle = seenColor;
    }

    //drawing borders of cell
    context.strokeRect(
      this.x * scale + offset,
      this.y * scale + offset,
      scale - 2 * offset,
      scale - 2 * offset
    );
    // adding color to cell
    context.fillRect(
      this.x * scale + offset,
      this.y * scale + offset,
      scale - 2 * offset,
      scale - 2 * offset
    );
  }

  //draw the line joining start and end when path is found
  async drawPathLine(prev) {
    //line width of final path mapper
    context.lineWidth = 4;
    context.strokeStyle = custom_green;
    let beginX = this.x * scale + scale / 2;
    let beginY = this.y * scale + scale / 2;
    let endX = prev.x * scale + scale / 2;
    let endY = prev.y * scale + scale / 2;
    context.beginPath();
    context.moveTo(beginX, beginY);
    context.lineTo(endX, endY);
    context.stroke(); //draw line
    context.closePath();

    // adding these so that the start and goal images dont get overlapped by lines drawn at the end
    if (prev == board.start) {
      board.start.show();
    }
    if (this == board.goal) {
      board.goal.show();
    }
  }
}
