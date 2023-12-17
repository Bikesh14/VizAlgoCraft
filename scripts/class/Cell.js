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

  async visitNode() {
    sleep(2500 / fps).then(() => {
      this.show(visitedColor);
    });
  }

  async discoverNode(parent) {
    this.hasBeenDiscovered = true;
    this.parent = parent;
    this.show(activeColor);
    sleep(2500 / fps).then(() => {
      this.show(discoveredColor);
    });
    await sleep(1000 / fps);
  }

  async show(color) {
    // Default fill and stroke
    context.lineWidth = 1;
    context.strokeStyle = defaultBorder;
    context.fillStyle = defaultColor;

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
      context.fillStyle = wallColor;
    } else if (color) {
      context.fillStyle = color;
    } else if (this.hasBeenDiscovered) {
      context.fillStyle = seenColor;
    }

    context.strokeRect(
      this.x * scale + offset,
      this.y * scale + offset,
      scale - 2 * offset,
      scale - 2 * offset
    );
    context.fillRect(
      this.x * scale + offset,
      this.y * scale + offset,
      scale - 2 * offset,
      scale - 2 * offset
    );
  }

  async drawPathLine(prev) {
    //line width of final path mapper
    context.lineWidth = 4;
    context.strokeStyle = pathLineColor;
    let beginX = this.x * scale + scale / 2;
    let beginY = this.y * scale + scale / 2;
    let endX = prev.x * scale + scale / 2;
    let endY = prev.y * scale + scale / 2;
    context.beginPath();
    context.moveTo(beginX, beginY);
    context.lineTo(endX, endY);
    context.stroke(); //draw line
    context.closePath();

    // adding these so that the start and goal images dont get overlapped
    if (prev == board.start) {
      board.start.show();
    }
    if (this == board.goal) {
      board.goal.show();
    }
  }
}
