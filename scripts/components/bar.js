/**
 * Class representing a bar in a visualization.
 */
class Bar {
  /**
   * Create a bar.
   * @param {number} x - The x-coordinate of the top-left corner of the bar.
   * @param {number} y - The y-coordinate of the top-left corner of the bar.
   * @param {number} width - The width of the bar.
   * @param {number} value - The height of the bar.
   * @param {string} [color=custom_blue] - The color of the bar (default is custom_blue).
   */
  constructor(x, y, width, value, color = custom_blue) {
    this.x = x;
    this.y = y + 30;
    this.width = width;
    this.value = value;
    this.height = value * calcLineHeightMultiplier(elements_array);
    this.color = color;
  }

  /**
   * Draw the bar on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    if (elements_array.length <= 20) {
      const textX = this.x + this.width / 2;
      const textY = this.y - 10; // Adjust the value for vertical placement
      ctx.fillStyle = custom_black;
      ctx.font = "16px Roboto";
      ctx.textAlign = "center";
      ctx.fillText(this.value, textX, textY);
    }
  }

  /**
   * Reset the color of the bar to the default color.
   */
  resetColor() {
    this.color = custom_blue;
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
   * @param {number} value - The new value of the bar.
   * @param {string} color - The new color of the bar.
   */
  setValue(value, color) {
    if (!this.isSorted()) {
      this.height = value * calcLineHeightMultiplier(elements_array);
      this.color = color;
      this.value = value;
    }
  }

  /**
   * Get the current value of the bar.
   * @returns {number} - The current value of the bar.
   */
  getValue() {
    return this.value;
  }
}
