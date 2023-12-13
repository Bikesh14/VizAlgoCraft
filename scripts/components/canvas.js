class Canvas {
  constructor(elements_array) {
    this.elements_array = elements_array;
  }

  initLines() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    lines = [];
    let lineWidth = calcBarWidth(elements_array.length);
    return this.elements_array.forEach((value, i) => {
      lines.push(new Bar(lineWidth * i + i, 0, lineWidth, value, this.color));
    });
  }
}
