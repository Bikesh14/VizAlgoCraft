/**
 * Generates a random array of elements and shuffles the order.
 * @param {number} number_of_elements - The number of elements to generate in the array (default is 5).
 * @returns {number[]} - The generated and shuffled array.
 */
const randomArrayGenerator = (number_of_elements = 5) => {
  let arr = [];
  for (let i = 1; i <= number_of_elements; i++) arr.push(i);
  return arr.sort((a, b) => (Math.random() > 0.5 ? 1 : -1)); //While sorting,returning 1 changes the order of two elements, -1 preserves the order
};

// window.addEventListener('resize', () => {
//   // Recalculate and update the lineWidth when the window is resized
//   canvas.width = innerWidth/2
//   canvas.height = innerHeight/4;
//   calcBarWidth();
//   initLines();
//   animate()
//   // Do something with the newLineWidth, e.g., update your visualization
// });

/**
 * Calculates the width of a bar based on the number of elements.
 * @param {number} array_length - The number of elements in the array.
 * @returns {number} - The calculated bar width.
 */
const calcBarWidth = (array_length) => {
  return Math.floor(canvas.width / array_length);
};

/**
 * Calculates the height multiplier for each element in the array. Considers the value of the largest element and scales the bar height accordingly
 * @param {number[]} elements - The array of elements.
 * @returns {number} - The calculated height multiplier.
 */
const calcLineHeightMultiplier = (elements) => {
  let maxValue = Math.max(...elements);
  return canvas.height / maxValue;
};

/**
 * Resets the specified color or 'blue' to the original color for all lines.
 * @param {string} color - The color to reset or 'blue'.
 */
const resetSpecifiedColor = (color) =>
  lines.forEach(
    (l) => (l.color === color || l.color === "blue") && l.resetColor() //if case=True, execute resetColor() and revert to original color
  );

/**
 * Animates the sorting process based on the selected algorithm.
 */
function animate() {
  sortingStates[configurations.algorithm]().forEach((action, i) => {
    timers.push(
      setTimeout(() => {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        sortActionsMap[action.type](action);
        lines.forEach((l) => l.draw(ctx));
        resetSpecifiedColor("yellow");
        resetSpecifiedColor("red");
      }, configurations.speed * i)
    );
  });
}
