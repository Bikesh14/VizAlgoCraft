
class Bar {
  constructor(x, y, width, height, color = "gray") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  resetColor() {
    this.color = "gray";
  }

  isSorted() {
    return this.color === custom_green;
  }

  setValue(v, color) {
    if (!this.isSorted()) {
      this.height = v;
      this.color = color;
    }
  }

  getValue() {
    return this.height;
  }
}

