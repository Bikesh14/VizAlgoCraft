/**
 * Generates a random array of elements and shuffles the order.
 * @param {number} number_of_elements - The number of elements to generate in the array (default is 5).
 * @returns {number[]} - The generated and shuffled array.
 */
const randomArrayGenerator = (number_of_elements) => {
  let arr = [];
  for (let i = 1; i <= number_of_elements; i++) arr.push(i);
  return arr.sort((a, b) => (Math.random() > 0.5 ? 1 : -1)); //While sorting,returning 1 changes the order of two elements, -1 preserves the order
};

/**
 * Calculates the width of a bar based on the number of elements.
 * @param {number} array_length - The number of elements in the array.
 * @returns {number} - The calculated bar width.
 */
const calcBarWidth = (array_length) => {
  //subtracting array length to avoid overflowing, as space is there between two bars the bars gets overflowed
  canvasMaxWidth = canvas.width - array_length;
  return canvasMaxWidth / array_length;
};

/**
 * Calculates the height multiplier for each element in the array. Considers the value of the largest element and scales the bar height accordingly
 * @param {number[]} elements - The array of elements.
 * @returns {number} - The calculated height multiplier.
 */
const calcLineHeightMultiplier = (elements) => {
  let maxValue = Math.max(...elements);
  //subtracting 30 since I have shifted the vertical height down 30 to show numbers
  barMaxHeight = canvas.height - 30;
  return barMaxHeight / maxValue;
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
  console.log(sortingStates, elements_array);
  sortingStates[configurations.algorithm]().forEach((action, i) => {
    timers.push(
      setTimeout(() => {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        console.log(action);
        sortActionsMap[action.type](action);
        lines.forEach((l) => l.draw(ctx));
        resetSpecifiedColor("yellow");
        resetSpecifiedColor("red");
      }, configurations.speed * i)
    );
  });
}
