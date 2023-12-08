/**
 * Class representing a bar in a visualization.
 */
class Bar {
  /**
   * Create a bar.
   * @param {number} x - The x-coordinate of the top-left corner of the bar.
   * @param {number} y - The y-coordinate of the top-left corner of the bar.
   * @param {number} width - The width of the bar.
   * @param {number} height - The height of the bar.
   * @param {string} [color="gray"] - The color of the bar (default is "gray").
   */
  constructor(x, y, width, height, color = "gray") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  /**
   * Draw the bar on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  /**
   * Reset the color of the bar to the default color.
   */
  resetColor() {
    this.color = "gray";
  }

  /**
   * Check if the bar is marked as sorted.
   * @returns {boolean} - True if the bar is marked as sorted, false otherwise.
   */
  isSorted() {
    return this.color === custom_green;
  }

  /**
   * Set the value and color of the bar if it is not marked as sorted.
   * @param {number} v - The new value of the bar.
   * @param {string} color - The new color of the bar.
   */
  setValue(v, color) {
    if (!this.isSorted()) {
      this.height = v;
      this.color = color;
    }
  }

   /**
   * Get the current value of the bar.
   * @returns {number} - The current value of the bar.
   */
  getValue() {
    return this.height;
  }
}

