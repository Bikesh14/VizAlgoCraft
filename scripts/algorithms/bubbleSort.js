/**
 * Performs the bubble sort algorithm on an array and generates sorting actions.
 * @param {number[]} array - The array to be sorted.
 * @returns {Object[]} - An array of sorting actions representing the steps of the algorithm.
 */
const bubbleSort = (array) => {
  let startTime = Date.now();
  let actions = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      actions.push(sortActions.comparing(j, j + 1));
      if (array[j] > array[j + 1]) {
        let tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
        actions.push(sortActions.swap(j, j + 1));
      }
    }
    actions.push(sortActions.sorted(array.length - i - 1));
  }
  let endTime = Date.now();

  let timeRequired = endTime - startTime;
  console.log(startTime);
  console.log(endTime);
  console.log(
    "Time required------------------",
    timeRequired.toFixed(6),
    "milliseconds"
  );
  return actions;
};
